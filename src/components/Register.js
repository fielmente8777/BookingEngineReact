import React, { useContext, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import AuthContext from '../context/AuthProvider';
import "../style/Login.css";

export const Register = (props) => {

    const {setAuthenticatedUser} = props
    const { openLoginPopup, setOpenLoginPopup,setopenRegisterPopup,FetchUsersBookings,FetchUsersFutureBookings } = useContext(AuthContext);

    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [email, setemail] = useState("");

    const [otp, setOtp] = useState(false);
    const [otpDigit, setOtpDigit] = useState(false);
    const [Message,setMessage] = useState("")


    const RegisterUserToEngine = async() => {
        const response = await fetch(`${props.baseUrl}/feature1/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                "register":true,
                "Name":name,
                "emailId":email,
                "phone":phone,
                "hotelid":localStorage.getItem("hid"),
                "ndid":localStorage.getItem("hotelid")
            })
        });

        const details = await response.json()
        if(details.Status){
            setOtp(true);
        }
        else{
            setMessage(details.Message)
            setPhone("")
            setName("")
            setemail("")
        }
    }

    const VerifyUserToEngineWithOtp = async() => {
        const response = await fetch(`${props.baseUrl}/feature1/otp-verify`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "hotelid":localStorage.getItem("hid"),
                "ndid":localStorage.getItem("hotelid"),
                "phone":phone,
                "otp":otpDigit
            })
        });

        const details = await response.json()
        if(details.Status){
            localStorage.setItem("engineAuth",details.Token)
            setAuthenticatedUser(true)
            setopenRegisterPopup(false)
            FetchUsersBookings()
            FetchUsersFutureBookings()
        }
        else{
            setMessage("OTP is wrong")
            
        }
    }
   

    const handleCloseRegister = () => {
      
        setopenRegisterPopup(false)
    }
    return (
        <div className='loginPage'>
            <div  className="div">
                <div style={{ textAlign: "end", fontWeight: "700" }}><IoCloseSharp onClick={handleCloseRegister} size={24} style={{ cursor: "pointer" }} color='#525252' /></div>

                <div className="div-2">Sign up to your Account</div>
                <div className="div-3">See what is going on with your business</div>

                <div className="div-7">
                    <span style={{ color: "rgba(221,221,221,1)" }}>-------------</span> Sign
                    up {" "}
                    <span style={{ color: "rgba(221,221,221,1)" }}>------------- </span>
                </div>
                <div>
                    <div className="div-8">Name</div>
                    <input
                        type='text'
                        className="div-9 out"
                        placeholder='John Smith'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>
                <div>
                    <div className="div-8">Email</div>
                    <input
                        type='text'
                        className="div-9 out"
                        placeholder='abc@email.com'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />

                </div>
                <div>
                    <div className="div-8">Phone</div>
                    <input
                        type='number'
                        className="div-9 out"
                        placeholder='+912482894293'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    {Message!==""? <p style={{ color: "red" }}>{Message}</p> :""}
                </div>

                {otp ? <div>
                    <div className="div-10">Enter OTP</div>
                    <input
                        type='number'
                        className="div-9 out"
                        placeholder='*********'
                        value={otpDigit}
                        onChange={(e) => setOtpDigit(e.target.value)}
                    />
                </div> :
                    ""}
                {/* <div className="div-12">
                    <div className="div-13">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/318e991ee148038607ffe718553a37cbc1b3cbcebcd2ef96ebf9388c94c5d64c?"
                            className="img-2"
                        />
                        <div className="div-14">Remember Me</div>
                    </div>
                    <div className="div-15">Forgot Password?</div>
                </div> */}
                {otp ?
                    <button type='submit' onClick={()=>{VerifyUserToEngineWithOtp()}} className="div-16" style={{ backgroundColor: props.bt_color }}>Verify Otp</button>
                    :
                    <button type='submit' onClick={()=>{RegisterUserToEngine()}} className="div-16" style={{ backgroundColor: props.bt_color }}>Register</button>
                }
            </div>
        </div>
    )
}


