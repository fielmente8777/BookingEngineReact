import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import "../style/Navmenu.css"
import { Link } from 'react-router-dom'




const Navmenu = () => {
    const { isMenuOpen, setIsMenuOpen } = useContext(AuthContext)
    const meHuParameter = "meHuParameter"
    const handleCloseMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogoutPopup = () => {
        // localStorage.clear()
        // props.setAuthenticatedUser(false)
    }

    return (
        <div className='navmenu' onBlur={handleCloseMenu}>

            <div className='items' onBlur={handleCloseMenu} style={{ height: "200px" }}>
                <Link className='profile' to={`/profile?shdf=${meHuParameter}`}>Profile</Link>
                <Link className='profile' onClick={handleLogoutPopup}>Logout</Link>

            </div>

        </div>
    )
}

export default Navmenu