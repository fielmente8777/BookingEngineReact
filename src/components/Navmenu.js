import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import "../style/Navmenu.css"




const Navmenu = (props) => {
    const { isMenuOpen, setIsMenuOpen } = useContext(AuthContext)
    const meHuParameter = "meHuParameter"
    const handleCloseMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogoutPopup = () => {
        localStorage.clear()
        props.setAuthenticatedUser(false)
    }

    return (
        <div className='navmenu' onBlur={handleCloseMenu}>

            <div className='items' onClick={()=>{handleCloseMenu()}} style={{ height: "auto" }}>
                <Link className='profile' to={`/profile?id=${localStorage.getItem("hotelid")}&hid=${localStorage.getItem("hid")}`}>Profile</Link>
                <Link className='profile' to={`/booking?id=${localStorage.getItem("hotelid")}&hid=${localStorage.getItem("hid")}`}>Bookings</Link>
                <Link className='profile' onClick={handleLogoutPopup} to={`/?id=${localStorage.getItem("hotelid")}&hid=${localStorage.getItem("hid")}`}>Logout</Link>

            </div>

        </div>
    )
}

export default Navmenu