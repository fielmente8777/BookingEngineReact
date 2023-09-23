import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import "../style/Reserve.css"


import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';



function Contactinfo(props) {
    let tax = 0
    if (props.price * props.nights <= 1000) {
        tax = 0
    }
    else if (props.price * props.nights > 1000 && props.price * props.nights < 2499) {
        tax = 0.12;
    }
    else if (props.price * props.nights > 2500 && props.price * props.nights < 7499) {
        tax = 0.18;
    }
    else {
        tax = 0.28;
    }

    const [Razorpay, createOrder] = useRazorpay(); // Destructure 'Razorpay' and 'createOrder' from the hook

    const [amount, setAmount] = useState(tax * (props.price * props.nights) + (props.price * props.nights));
    const [OrderId, setOrderId] = useState('')
    const [Type, setType] = useState(props.type)
    const [BookingId, setBookingId] = useState("1")
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Country, setCountry] = useState('')
    const [City, setCity] = useState('')

    // location api

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
                    try {
                        const result = await axios.get(url);
                        const { locality, city, country, principalSubdivision } = result.data;
                        // console.log(result.data);



                        setCity(result.data.city)
                        setCountry(result.data.countryName)
                    } catch (err) {
                        console.log(err);
                        // Handle the error as needed
                    }
                },
                (error) => {
                    console.log(error);
                    // Handle geolocation error
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            // Handle geolocation not supported
        }
    }, []);



    const GetOrderId = async () => {
        const response = await fetch(`http://127.0.0.1:5000/payment/create_order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "amount": props.room*props.BookingTotalPrice,
                "currency": "INR",
                "guestName": Name,
                "guestInfo": {
                    "EmailId": Email,
                    "Phone": Phone,
                    "City": City,
                    "Country": Country
                },
                "roomType": Type,
                "payment": {
                    "Status": "PENDING",
                    "RefNo": "",
                    "PaymentProvider": "RazorPay",
                    "Mode": "Online"
                },
                "checkIn": localStorage.getItem('Checkin'),
                "checkOut": localStorage.getItem('Checkout'),
                "bookedRooms": props.room,
                "price": {
                    "Principal":props.room*props.BookingPrice,
                    "Tax": props.room*props.BookingTax,
                    "Total": props.room*props.BookingTotalPrice
                },
                "isCheckedIn": false,
                "isCheckedOut": false
            })
        });

        const json = await response.json();

        if (json.Status === true) {
            setOrderId(json.order_id)

        } else {
            document.getElementById("No_rooms").style.display = "block"
        }
    }

    const PaymentSuccessFull = async (payid) => {
        const response = await fetch(`http://127.0.0.1:5000/booking/update`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "orderid": OrderId,
                "paymentid": payid
            })
        })



    }

    const handlePayment = async () => {
        try {

            const mockOrderData = {
                amount: parseInt(props.room*props.BookingTotalPrice) * 100, // Convert amount to paise (assuming INR)
                orderId: OrderId, // Generate a unique order ID
            };

            const options = {
                key: "rzp_test_UZ0V9jh3jMC0C9", // Enter the Key ID generated from the Dashboard
                amount: mockOrderData.amount.toString(), // Use the amount from the order data
                currency: "INR",
                name: props.HotelName,
                description: "Test Transaction",
                image: props.HotelLogo,
                order_id: OrderId, // Use the order ID from the order data
                handler: async function (response) {
                    setOrderId(response.razorpay_order_id);
                    await PaymentSuccessFull(response.razorpay_payment_id)
                    props.setPayment({
                        "Status": true,
                        "Order": response.razorpay_order_id,
                        "Payment": response.razorpay_payment_id,
                        "Name": Name,
                        "Phone": Email,
                        "Email": Phone,
                        "City": City,
                        "Country": Country,
                        "Checkin": localStorage.getItem('Checkin'),
                        "Checkout": localStorage.getItem('Checkout'),
                        "Adult": localStorage.getItem('Adult'),
                        "Kid": localStorage.getItem('Kid'),
                        "Tax": props.room*props.BookingTax,
                        "Amount": props.room*props.BookingTotalPrice

                    })
                },

                theme: {
                    color: props.Bg_color,
                },
            };

            const rzp1 = new Razorpay(options);

            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });

            rzp1.open();
        } catch (error) {
            console.log("Payment Error:", error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="contact-info">
                    <div id="Contact" className="mt-4">
                        <div className="heading" style={{ backgroundColor: props.color }}>
                            <h5>Guest Information</h5>
                        </div>
                        <div className="contact-main">
                            <div className="inner-contact-left">
                                <div className="code">
                                    <div className="inputBox">
                                        <span className="text-span">Full Name <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">
                                            <div className="prefix">
                                                <select id="prefix" name="prefix" className="form-control form-prefix bg" required>
                                                    <option value="Mr.">Mr.</option>
                                                    <option value="Mrs.">Mrs.</option>
                                                    <option value="Mrs.">Miss.</option>
                                                    <option value="Mrs.">Dr.</option>
                                                    <option value="Mrs.">Prof.</option>
                                                </select>
                                            </div>
                                            <div className="name-input">
                                                <input type="text" className="bg" name="fullname" id="FullName" placeholder="Full Name" value={Name} onChange={(e) => { setName(e.target.value) }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Email Id <span style={{ color: 'red' }}>*</span></span>
                                        <input type="email" className="bg" value={Email} onChange={(e) => { setEmail(e.target.value) }} name="email" id="Email" placeholder="Please enter your email id"
                                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required />

                                    </div>
                                    <div className="inputBox mobile">
                                        <span className="text-span">Phone No. <span style={{ color: 'red' }}>*</span></span>
                                        <div className="phone-input-container">
                                            <PhoneInput
                                                className="phone-input-field"
                                                defaultCountry="IN"
                                                placeholder="Enter phone number"
                                                value={Phone}
                                                onChange={(newPhone) => setPhone(newPhone)}
                                            />
                                        </div>
                                    </div>

                                    <div className="inputBox inputBox-city">
                                        <span className="text-span">City <span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            value={City}
                                            onChange={(e) => setCity(e.target.value)}
                                            type="text"
                                            id="user_city"
                                            className="bg"
                                            name="city"
                                            required
                                        />
                                    </div>

                                    <div className="inputBox content_inner">
                                        <span className="text-span">Country <span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            type="text"
                                            value={Country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>
                                    <div className="content_inner">
                                        <span className="text-span">Special Requests</span>
                                        <textarea className="bg" name="text" id="request" placeholder="ADDITIONAL REQUEST"></textarea>
                                    </div>

                                </div>

                                {/* <div className="button_s">
                                    <button className="submitbtn" onClick={toggleDiv}>Submit</button>
                                </div> */}
                            </div>


                            <div className="inner-contact-right">
                                <h4 className="m-2 text-center">Reservation details</h4>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span><a onclick="toggleAccordion1(1);">Edit<i
                                                className='fas fa-edit mx-2'></i></a></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">

                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">Check</span>
                                        </div>
                                        <div>
                                            <span className="right-span" id="Final_checkin">{localStorage.getItem("Checkin")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">Check Out</span>
                                        </div>
                                        <div>
                                            <span className="right-span" id="Final_checkout">{localStorage.getItem("Checkout")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">No. of night</span>
                                        </div>
                                        <div>
                                            <p className="right-span"><span id="Final_night">{props.nights}</span> Night</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">Rooms</span>
                                        </div>
                                        <div>
                                            <p className="right-span"><span id="Final_room">{props.room}</span> Room</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">No. of guests</span>
                                        </div>
                                        <div>
                                            <span className="right-span"><span id="Final_adult">{localStorage.getItem("Adult")}</span> adults, <span id="Final_kid">{localStorage.getItem("Kid")}</span> children</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div className="cust-sub d-flex flex-column py-2">
                                            <span className="left-span">Sub total</span>
                                            <span className="left-span">Taxes and fees</span>
                                        </div>
                                        <div className="cust-sub d-flex flex-column py-2">
                                            <span style={{ fontWeight: 550 }} ><span className="right-span" id="Final_price">{props.room*props.BookingPrice}</span> INR</span>
                                            <span style={{ fontWeight: 550 }} ><span className="right-span" id="Final_tax">{props.room*props.BookingTax}</span> INR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div className="py-2">
                                            <span className="left-span">GRAND TOTAL</span>
                                        </div>
                                        <div className="py-2">
                                            <span className="right-span"><span id="Final_payable_price">{props.room*props.BookingTotalPrice}</span> INR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {(Name && Phone && Email && Country && City) && !OrderId ?
                            <div className="button_s">
                                <button className="submitbtn" onClick={GetOrderId}>Request Payment</button>
                            </div> : ""}


                        {!OrderId ? "" : <div className="bookingbtn">
                            <button className="cmplt pay_button" id="rzp-button1" onClick={handlePayment} style={{ backgroundColor: props.color }}>{props.Paymentbutton}</button>
                        </div>}
                    </div>

                    {/* contact information end  */}
                </div>
            </div >

            {/* {isOpen && (
                <Payment />
            )} */}

        </>
    )
}

export default Contactinfo;