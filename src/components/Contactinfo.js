import { useCallback, useState } from "react";
import useRazorpay from "react-razorpay";

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

    const [amount, setAmount] = useState(tax*(props.price * props.nights)+(props.price * props.nights));
    const [OrderId,setOrderId] = useState('')
    const [Type,setType] = useState(props.type)

    const GetOrderId = async()=>{
        const response = await fetch(`http://127.0.0.1:5000/payment/create_order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                "ndid":localStorage.getItem('hotelid'),
                "amount":amount,
                "currency":"INR",
                "guestName": "Nitin Chauhan",
                "roomType":Type ,
                "payment": {
                    "Status": "PENDING",
                    "RefNo": "",
                    "PaymentProvider": "RazorPay",
                    "Mode": "Online"
                },
                "checkIn": localStorage.getItem('Checkin'),
                "checkOut": localStorage.getItem('Checkout'),
                "bookedRooms":props.room ,
                "price": {
                    "Principal":props.price * props.nights ,
                    "Tax": tax*(props.price * props.nights),
                    "Total": amount
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

    const PaymentSuccessFull = async(payid)=>{
        const response = await fetch(`http://127.0.0.1:5000/booking/update`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                "ndid":localStorage.getItem('hotelid'),
                "orderid":OrderId,
                "paymentid":payid
            })
        })
        props.setPayment("Done")
    }

    const handlePayment = async () => {
        try {
            
            const mockOrderData = {
                amount: parseInt(amount) * 100, // Convert amount to paise (assuming INR)
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
                handler: function (response) {
                    setOrderId(response.razorpay_order_id);
                    PaymentSuccessFull(response.razorpay_payment_id)
                    window.location.reload()
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
                                        <span className="text-span">Full Name*</span>
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
                                                <input type="text" className="bg" name="fullname" id="FullName" placeholder="Full Name" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Email Id*</span>
                                        <input type="email" className="bg" name="email" id="Email" placeholder="Please enter your email id"
                                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required />

                                    </div>
                                    <div className="inputBox mobile">
                                        <span className="text-span">Phone no.*</span>
                                        <input type="tel" className="bg" name="number" id="Number" required />
                                    </div>

                                    <div className="content_inner">
                                        <span className="text-span">Country*</span>
                                        <select id="country" name="country" className="form-control form-country bg" required>
                                            <option value="Country">Country</option>
                                            <option value="India">India</option>

                                        </select>
                                    </div>

                                    <div className="inputBox inputBox-city">
                                        <span className="text-span">City*</span>
                                        <input type="text" id="user_city" className="bg" name="city" required />
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
                                            <span style={{ fontWeight: 550 }} ><span className="right-span" id="Final_price">{props.price * props.nights}</span> INR</span>
                                            <span style={{ fontWeight: 550 }} ><span className="right-span" id="Final_tax">{tax * (props.price * props.nights)}</span> INR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div className="py-2">
                                            <span className="left-span">GRAND TOTAL</span>
                                        </div>
                                        <div className="py-2">
                                            <span className="right-span"><span id="Final_payable_price">{tax * (props.price * props.nights) + (props.price * props.nights)}</span> INR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {!OrderId?
                        <div className="button_s">
                            <button className="submitbtn" onClick={GetOrderId}>Request Payment</button>
                        </div> :

                        <div className="bookingbtn">
                            <button className="cmplt pay_button" id="rzp-button1" onClick={handlePayment} style={{ backgroundColor: props.color }}>{props.Paymentbutton}</button>
                        </div>}
                    </div>

                    {/* contact information end  */}
                </div>
            </div>

            {/* {isOpen && (
                <Payment />
            )} */}

        </>
    )
}

export default Contactinfo;