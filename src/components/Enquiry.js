import { useRef, useState } from "react";
import "../style/Reserve.css";


import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';




function Enquiryform(props) {
    const dateInputRef = useRef(null);
    const [Name, setName] = useState('')
    const [EmailId, setEmailId] = useState('')
    const [Number, setNumber] = useState('')
    const [Adults, setAdults] = useState('')
    const [Kids, setKids] = useState('')
    const [Rooms, setRooms] = useState('')
    const [Checkin, setCheckin] = useState('')
    const [Checkout, setCheckout] = useState('')
    const [City, setCity] = useState('')
    const [Message, setMessage] = useState('')

    const baseUrl = "https://nexon.eazotel.com"



    const createquery = async () => {
        const response = await fetch(`${baseUrl}/booking/engine/queryrates/${localStorage.getItem('hotelid')}`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "Name": Name,
                    "EmailId": EmailId,
                    "Number": Number,
                    "Adults": Adults,
                    "Kids": Kids,
                    "Rooms": Rooms,
                    "Checkin": Checkin,
                    "Checkout": Checkout,
                    "City": City,
                    "Message": Message
                }
            )
        });

        const json = await response.json();

        if (json.Status === true) {
            alert(json.Messsage)
            setName('')
            setEmailId('')
            setNumber('')
            setAdults('')
            setKids('')
            setRooms('')
            setCheckin('')
            setCheckout('')
            setCity('')
            setMessage('')

        } else {
            document.getElementById("No_rooms").style.display = "block"
        }
    }
    const [classhide, setclasshide] = useState(true)
    const openclosehide = () => {
        setclasshide(!classhide)
    }
    return (
        <>
            <div className="container querycontainer">
                <div className="contact-info" >
                    <div id="Contact" className="mt-4"  >
                        <div className={`heading ${!classhide ? 'round' : "round1"}`} style={{ cursor: "pointer", textAlign: "center", background: props.bg_color, }} onClick={() => { openclosehide() }} >
                            <h5><strong >Looking for Group/Corporate Discounted Room Rates <i className="fa fa-question-circle"></i></strong></h5>
                            {/* <span className="badge bg-secondary">Click here</span>   &#9660;  */}
                        </div>
                        {classhide ? <div className={`contact-main`} >
                            <div className="inner-contact-left" style={{ width: "100%" }}>
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
                                        <input type="email" className="bg" value={EmailId} onChange={(e) => { setEmailId(e.target.value) }} name="email" id="Email" placeholder="Please enter your email id"
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
                                                value={Number}
                                                onChange={(newPhone) => setNumber(newPhone)}
                                            />
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Adults <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">
                                            <div className="name-input">
                                                <input type="number" min={0} className="bg" name="fullname" id="FullName" placeholder="Number of Adults" value={Adults} onChange={(e) => { setAdults(e.target.value) }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Kids <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">

                                            <div className="name-input">
                                                <input type="number" className="bg" name="fullname" id="FullName" placeholder="Number of kids" value={Kids} onChange={(e) => { setKids(e.target.value) }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Rooms <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">
                                            <div className="name-input">
                                                <input type="text" className="bg" name="fullname" id="FullName" placeholder="Number of Rooms" value={Rooms} onChange={(e) => { setRooms(e.target.value) }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Checkin <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">
                                            <div className="name-input">
                                                <input type="date" className="bg" name="fullname" id="FullName" placeholder="Full Name" value={Checkin} onChange={(e) => { setCheckin(e.target.value) }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputBox">
                                        <span className="text-span">Checkout <span style={{ color: 'red' }}>*</span></span>
                                        <div className="names">
                                            <div className="name-input">
                                                <input type="date" className="bg" name="fullname" id="FullName" placeholder="Full Name" value={Checkout} onChange={(e) => { setCheckout(e.target.value) }} required />
                                            </div>
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

                                    <div className="content_inner">
                                        <span className="text-span">Message</span>
                                        <textarea className="bg" name="text" id="request" value={Message} onChange={(e) => { setMessage(e.target.value) }} placeholder="ADDITIONAL REQUEST"></textarea>
                                    </div>

                                    <button style={{ backgroundColor: props.bg_color }} className='ReserveButtonForPayment' onClick={() => { createquery() }} >Send Query</button>
                                </div>

                            </div>

                        </div> : ""}



                    </div>

                </div>
            </div >
        </>
    )
}

export default Enquiryform;