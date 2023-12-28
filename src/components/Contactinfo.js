import axios from "axios";
import { useCallback, useEffect, useState ,useMemo} from "react";
import useRazorpay from "react-razorpay";
import "../style/Reserve.css";
import Button from 'react-bootstrap/Button';


import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import Select from 'react-select'
import countryList from 'react-select-country-list'



function Contactinfo(props) {
    const baseUrl = props.baseURL
    // const baseUrl = "http://127.0.0.1:5000"
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
    const [specialRequest,setspecialRequest]=useState('')
    const [checkoutdate,setcheckoutdate]=useState('')

    const [subTotal,setsubTotal] = useState(Number(props.Packageprice))
    const [Tax,setTax] = useState(0)
    const [GrandTotal,setGrandTotal] = useState(subTotal+Tax)

    const [Payableamount,setPayableamount] = useState(Number(subTotal))
    const [Paymentstatus,setpaymentstatus] = useState('PENDING')
    const [paystatus,setPaystatus] = useState('PAY AT HOTEL')

    const [Delux,setDelux] = useState(0)
    const [Suite,setSuite] = useState(0)
    const [Superd,setSuperd] = useState(0)
    const [Premium,setPremium] = useState(0)
    const [rt,setrt] = useState(props.roomtype)
    

    
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

    const changeDateFormat=(inputdate)=>{

        var date = new Date(inputdate);
        // Get day, month, and year
        var day = date.getDate();
        var month = date.getMonth() + 1; // Months are zero-based
        var year = date.getFullYear();

        // Pad day and month with leading zeros if needed
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        // Format the date as 'DD-MM-YYYY'
        var formattedDate = day + '-' + month + '-' + year;

        return formattedDate
    }

    const changeAddDateformat=(inputdate,days)=>{
        var bookingDate = new Date(inputdate);
        days = Number(days)-1;

        // Package duration (3 days 2 nights)
        var packageDuration = days;

        // Calculate checkout date
        var checkoutDate = new Date(bookingDate);
        checkoutDate.setDate(checkoutDate.getDate() + packageDuration);

        // Format checkout date as 'DD-MM-YYYY'
        var formattedCheckoutDate =
        checkoutDate.getDate() +
        '-' +
        (checkoutDate.getMonth() + 1) +
        '-' +
        checkoutDate.getFullYear();

        return formattedCheckoutDate;

    }

    const Adddays_Dateformat=(inputdate,days)=>{
        var bookingDate = new Date(inputdate);
        days = Number(days)-1;

        // Package duration (3 days 2 nights)
        var packageDuration = days;

        // Calculate checkout date
        var checkoutDate = new Date(bookingDate);
        checkoutDate.setDate(checkoutDate.getDate() + packageDuration);

        // Format checkout date as 'DD-MM-YYYY'
        var formattedCheckoutDate =
        checkoutDate.getFullYear() +
        '-' +
        (checkoutDate.getMonth() + 1) +
        '-' +
        checkoutDate.getDate();

        setcheckoutdate(formattedCheckoutDate)
        return formattedCheckoutDate;

    }

    const PopupFillFields = ()=>{
        alert("Please fill up the fields")
    }

    const roomsetType=()=>{
        if(rt==="1"){
            setDelux(1)
        }
        if(rt==="2"){
            setSuperd(1)
        }
        if(rt==="3"){
            setSuite(1)
        }
        if(rt==="4"){
            setPremium(1)
        }
    }
    
    const GetPayLaterOrderId = async () => {
        roomsetType()
        var checkout = Adddays_Dateformat(localStorage.getItem('Checkin'),props.PackageDays);
        const response = await fetch(`${baseUrl}/payment/create_order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "amount": subTotal,
                "currency": props.currency,
                "guestInfo": {
                    "guestName": Name,
                    "EmailId": Email,
                    "Phone": Phone,
                    "City": City,
                    "Country": Country
                },
                "Adults":props.PackageGuest,
                "Kids":0,
                "Bookings": [
                    { "RoomType": "1", "Qty":Delux  },
                    { "RoomType": "2", "Qty":Superd },
                    { "RoomType": "3", "Qty":Suite },
                    { "RoomType": "4", "Qty":Premium  }
                ],
                "payment": {
                    "Status": "PENDING",
                    "RefNo": "",
                    "PaymentProvider": "RazorPay",
                    "Mode": "Online"
                },
                "mealPlan": {
                    "PackageId":"-",
                    "PackageName":"-",
                    "PackagePrice":"-",
                    "PackageperRoom":"-"
                },
                "packages": {
                    "PackageId":props.packageId,
                    "PackageName":props.PackageName,
                    "PackagePrice":subTotal,
                    "SpecialRequest":specialRequest
                },
                "checkIn": localStorage.getItem('Checkin'),
                "checkOut": checkout,
                "price": {
                    "AmountPay": 0,
                    "Principal": subTotal,
                    "Tax": Tax,
                    "Total": GrandTotal
                },
                "isCheckedIn": false,
                "isCheckedOut": false
            })
        });

        const json = await response.json();
        console.log(json)
        if (json.Status === true) {
            console.log(json)
            props.setPayment({
                "Status": true,
                "Logo":props.HotelLogo,
                "HotelName": props.HotelName,
                "Order": json.order_id,  // Order ID from the payment gateway
                "Name": Name,
                "Phone": Phone,
                "Email": Email,
                "City": City,
                "Country": Country.label,
                "Delux":Delux,
                "Sd": Superd,
                "Suite": Suite,
                "Premium": Premium,
                "Checkin": localStorage.getItem('Checkin'),
                "Checkout": checkout,
                "Adult": props.PackageGuest,
                "Kid":0,
                "Tax": Tax,
                "Amount":subTotal,
                "PayStatus": "Pay At Hotel",
                "MealPlan":"-",
                "Mealprice":"-",
                "PackagePlan":props.PackageName,
                "PackagePrice":subTotal,
                "Rooms":props.RoomCategoryCombination

            })

        } else {
            document.getElementById("No_rooms").style.display = "block"
        }
    }

    const GetHalfOrderId = async () => {
        roomsetType()
        var checkout = Adddays_Dateformat(localStorage.getItem('Checkin'),props.PackageDays);
        setpaymentstatus("ADVANCED")
        setPaystatus("HALF PAID")
        const response = await fetch(`${baseUrl}/payment/create_order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "amount": 0.5*subTotal,
                "currency": props.currency,
                "guestInfo": {
                    "guestName": Name,
                    "EmailId": Email,
                    "Phone": Phone,
                    "City": City,
                    "Country": Country
                },
                "Adults":props.PackageGuest,
                "Kids":0,
                "Bookings": [
                    { "RoomType": "1", "Qty":Delux  },
                    { "RoomType": "2", "Qty":Superd },
                    { "RoomType": "3", "Qty":Suite },
                    { "RoomType": "4", "Qty":Premium  }
                ],
                "payment": {
                    "Status": "PENDING",
                    "RefNo": "",
                    "PaymentProvider": "RazorPay",
                    "Mode": "Online"
                },
                "mealPlan": {
                    "PackageId":"-",
                    "PackageName":"-",
                    "PackagePrice":"-",
                    "PackageperRoom":"-"
                },
                "packages": {
                    "PackageId":props.packageId,
                    "PackageName":props.PackageName,
                    "PackagePrice":subTotal,
                    "SpecialRequest":specialRequest
                },
                "checkIn": localStorage.getItem('Checkin'),
                "checkOut": checkout,
                "price": {
                    "AmountPay":0.5*Number(subTotal),
                    "Principal": subTotal,
                    "Tax": Tax,
                    "Total": GrandTotal
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

    const GetFullOrderId = async () => {
        roomsetType()
        var checkout = Adddays_Dateformat(localStorage.getItem('Checkin'),props.PackageDays);
        setpaymentstatus("SUCCESS")
        setPaystatus("PAID")
        const response = await fetch(`${baseUrl}/payment/create_order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "amount": subTotal,
                "currency": props.currency,
                "guestInfo": {
                    "guestName": Name,
                    "EmailId": Email,
                    "Phone": Phone,
                    "City": City,
                    "Country": Country
                },
                "Adults":props.PackageGuest,
                "Kids":0,
                "Bookings": [
                    { "RoomType": "1", "Qty":Delux  },
                    { "RoomType": "2", "Qty":Superd },
                    { "RoomType": "3", "Qty":Suite },
                    { "RoomType": "4", "Qty":Premium  }
                ],
                "payment": {
                    "Status": "PENDING",
                    "RefNo": "",
                    "PaymentProvider": "RazorPay",
                    "Mode": "Online"
                },
                "mealPlan": {
                    "PackageId":"-",
                    "PackageName":"-",
                    "PackagePrice":"-",
                    "PackageperRoom":"-"
                },
                "packages": {
                    "PackageId":props.packageId,
                    "PackageName":props.PackageName,
                    "PackagePrice":subTotal,
                    "SpecialRequest":specialRequest
                },
                "checkIn": localStorage.getItem('Checkin'),
                "checkOut": checkout,
                "price": {
                    "AmountPay":subTotal,
                    "Principal": subTotal,
                    "Tax": Tax,
                    "Total": GrandTotal
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
        const response = await fetch(`${baseUrl}/booking/update`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "orderid": OrderId,
                "paymentid": payid,
                "Status": Paymentstatus
            })
        })



    }

    const handlePayment = async () => {
        try {
            const mockOrderData = {
                amount: parseInt(Payableamount* 100), // Convert amount to paise (assuming INR)
                orderId: OrderId, // Generate a unique order ID
            };

            const options = {
                key: "rzp_live_5uaIIwZcxLC70j",         // Enter the Key ID generated from the Dashboard rzp_test_UZ0V9jh3jMC0C9,rzp_live_5uaIIwZcxLC70j
                amount: mockOrderData.amount.toString(), // Use the amount from the order data
                currency: props.currency,
                name: props.HotelName,
                description: "Test Transaction",
                image: props.HotelLogo,
                order_id: OrderId, // Use the order ID from the order data
                handler: async function (response) {
                    setOrderId(response.razorpay_order_id);
                    await PaymentSuccessFull(response.razorpay_payment_id)
                    props.setPayment({
                        "Status": true,
                        "Logo":props.HotelLogo,
                        "HotelName": props.HotelName,
                        "Order": OrderId,  // Order ID from the payment gateway
                        "Payment": response.razorpay_payment_id,
                        "Name": Name,
                        "Phone": Phone,
                        "Email": Email,
                        "City": City,
                        "Country": Country.label,
                        "Delux":Delux,
                        "Sd": Superd,
                        "Suite": Suite,
                        "Premium": Premium,
                        "Checkin": localStorage.getItem('Checkin'),
                        "Checkout": checkoutdate,
                        "Adult": props.PackageGuest,
                        "Kid":0,
                        "Tax": Tax,
                        "Amount":subTotal,
                        "PayStatus":paystatus,
                        "MealPlan":"-",
                        "Mealprice":"-",
                        "PackagePlan":props.PackageName,
                        "PackagePrice":subTotal,
                        "Rooms":props.RoomCategoryCombination
        
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
    
    

    const options = useMemo(() => {
        const countryData = countryList().getData();
        const defaultOption = { label: Country, value: Country };
        return [defaultOption, ...countryData];
    }, []);
    const changeHandler = Country => {
        setCountry(Country)
    }
    return (
        <>
            <div className="container">
                <div className="contact-info">
                    <div id="Contact" className="mt-4">
                        <div className="heading" style={{ backgroundColor: props.Bg_color }}>
                            <h5>Guest Information</h5>
                        </div>
                        <div className="contact-main">
                            <div className="inner-contact-left">
                                <div className="code">
                                    <div className="inputBox">
                                        <span className="text-span">Name <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">
                                            
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
                                        <span className="text-span">Contact No. <span style={{ color: 'red' }}>*</span></span>
                                        <div className="phone-input-container ">
                                            <PhoneInput
                                                international
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
                                        <div className="country_select">
                                            <Select options={options} value={Country} onChange={changeHandler} />
                                        </div>

                                        {/* <input
                                            type="text"
                                            value={Country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        /> */}


                                    </div>
                                    <div className="content_inner">
                                        <span className="text-span">Special Requests</span>
                                        <textarea className="bg" name="text" id="request" placeholder="ADDITIONAL REQUEST" value={specialRequest} onChange={(e)=>{setspecialRequest(e.target.value)}}></textarea>
                                    </div>

                                    {/* <div className="content_inner">
                                        <span className="text-span">Promo Code</span>
                                        <div className="promo_btn_div">
                                            <input type="text" placeholder="Enter Promo Code here" />
                                            <Button>Apply</Button>
                                        </div>
                                    </div> */}




                                </div>
                                {OrderId ?
                                    <div className="bookingbtn">
                                        <button className="cmplt pay_button" id="rzp-button1" onClick={handlePayment} style={{ backgroundColor: props.color }}>{props.Paymentbutton}</button>
                                    </div>
                                :
                                (Name && Phone && Email && Country && City) && !OrderId ?
                                    <div className="button_s">
                                        <p className="button_s_p">By making this booking, you are accepting our terms and conditions***</p>
                                        {props.isPayatHotel?<button className="submitbtn" onClick={GetPayLaterOrderId}>PAY AT HOTEL</button>:""}
                                        {props.isOnlinepay?<button className="submitbtn" onClick={GetHalfOrderId}>PAY 50% AMOUNT <span>{0.5 * (GrandTotal)} {props.currency}</span></button>:""}
                                        {props.isOnlinepay?<button className="submitbtn" onClick={GetFullOrderId}>PAY FULL AMOUNT <span>{GrandTotal} {props.currency}</span></button>:""} 
                                        
                                    </div> :
                                    <div className="button_s">
                                        <p className="button_s_p">By making this booking, you are accepting our terms and conditions***</p>
                                        {props.isPayatHotel?<button className="submitbtn" onClick={PopupFillFields}>PAY AT HOTEL</button>:""}
                                        {props.isOnlinepay?<button className="submitbtn" onClick={PopupFillFields}>PAY 50% AMOUNT <span>{0.5 * (GrandTotal)} {props.currency}</span></button>:""}
                                        {props.isOnlinepay?<button className="submitbtn" onClick={PopupFillFields}>PAY FULL AMOUNT <span>{GrandTotal} {props.currency}</span></button>:""}
                                        
                                    </div>
                                }


                        
                                
                            </div>


                            <div className="inner-contact-right">
                                <h4 className="m-2 text-center">Reservation details</h4>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">Package</span>
                                        </div>
                                        <div>
                                            <span className="right-span" id="Final_checkin">{props.PackageName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">

                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">Check In</span>
                                        </div>
                                        <div>
                                            <span className="right-span" id="Final_checkin">{changeDateFormat(localStorage.getItem("Checkin"))}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">Check Out</span>
                                        </div>
                                        <div>
                                            <span className="right-span" id="Final_checkout">{changeAddDateformat(localStorage.getItem("Checkin"),props.PackageDays)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">No. of Night</span>
                                        </div>
                                        <div>
                                            <p className="right-span"><span id="Final_night">{props.PackageNights}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">No. of Days</span>
                                        </div>
                                        <div>
                                            <p className="right-span"><span id="Final_night">{props.PackageDays}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail">
                                    <div className="cust-inner">
                                        <div>
                                            <span className="left-span">No. of Guests</span>
                                        </div>
                                        <div>
                                            <span className="right-span"><span id="Final_adult">{props.PackageGuest}</span></span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="cust-detail sub-price">
                                    <div className="cust-inner">
                                        <div className="cust-sub d-flex flex-column py-2">
                                            <span className="left-span">Sub total</span>
                                            <span className="left-span">Taxes and fees</span>
                                        </div>
                                        <div className="cust-sub d-flex flex-column py-2">
                                            <span style={{ padding: '5px 0', fontWeight: '600' }}><span id="Final_price">{subTotal}</span> {props.currency}</span>
                                            <span style={{ fontWeight: '600' }}><span id="Final_tax" style={{ fontWeight: '600' }}>{Tax}</span> {props.currency}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cust-detail" style={{ borderBottom: '1px solid #9BCFF0' }}>
                                    <div className="cust-inner">
                                        <div className="py-2">
                                            <span className="left-span" style={{ color: '#153B5B', fontWeight: '700' }}>GRAND TOTAL</span>
                                        </div>
                                        <div className="py-2">
                                            <span className="right-span"><span id="Final_payable_price">{GrandTotal}</span> {props.currency}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            


                        </div>
                        
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