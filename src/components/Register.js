import React, { useContext, useState } from 'react'
import "../style/Login.css"
import AuthContext from '../context/AuthProvider'
import { IoCloseSharp } from "react-icons/io5";

export const Register = (props) => {


    const { openLoginPopup, setOpenLoginPopup } = useContext(AuthContext);

    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")

    const [otp, setOtp] = useState(false);
    const [otpDigit, setOtpDigit] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();

        setOtp(true);

        if (!otp) {
            console.log("otp nhi aay")
            return;
        }
        else {
            console.log(phone, otpDigit)
            console.log("otp aa gya hia ")
        }

    }

    const handleCloseLogin = () => {
        alert("jafnja")
        setOpenLoginPopup(false)
    }
    return (
        <div className='loginPage'>
            <form onSubmit={handleSubmit} className="div">
                <div style={{ textAlign: "end", fontWeight: "700" }}><IoCloseSharp onClick={handleCloseLogin} size={24} style={{ cursor: "pointer" }} color='#525252' /></div>

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
                    <div className="div-8">Phone</div>
                    <input
                        type='number'
                        className="div-9 out"
                        placeholder='+912482894293'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    {"If number is not registered" ? <p style={{ color: "red" }}>Number is not Registered</p> : ""}
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
                    <button type='submit' className="div-16" style={{ backgroundColor: props.bt_color }}>Submit</button>
                    :
                    <button type='submit' className="div-16" style={{ backgroundColor: props.bt_color }}>Send OTP</button>
                }
            </form>
        </div>
    )
}
