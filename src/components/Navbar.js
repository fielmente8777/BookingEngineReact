import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import AuthContext from '../context/AuthProvider';
import Navmenu from './Navmenu';
import './i18n'; // Import your i18n configuration




export default function Navbar(props) {


    const { openLoginPopup, setOpenLoginPopup, openRegisterPopup, setopenRegisterPopup, isMenuOpen, setIsMenuOpen } = useContext(AuthContext)
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };




    const handleLoginPopup = () => {
        setOpenLoginPopup(true);
    }
    const handleRegisterPopup = () => {
        setopenRegisterPopup(true);
    }

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Spanish' },
        { code: 'de', label: 'German' },
        { code: 'hi', label: 'Hindi' },
        { code: 'fr', label: 'French' },
        { code: 'it', label: 'Italian' },
        { code: 'ja', label: 'Japanese' },
        { code: 'ko', label: 'Korean' },
        { code: 'pt', label: 'Portuguese' },
        { code: 'ru', label: 'Russian' },
        // Add more languages here as needed
    ];

    const handleMenu = () => {

        setIsMenuOpen(!isMenuOpen)
    }
    return (

        <nav className={`navbar navbar-expand-lg ${props.display}`} style={{ background: props.color }}>
            <div className="container">
                <div className="nav-logo">
                    <a href={props.hotelwebsite}><img src={props.logo}
                        alt="logo" /></a>
                </div>


                {/* <a className="navbar-brand" href="#" style={{ color: '#fff', fontWeight: '500' }} >{props.hotelname}</a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ color: "#fff" }}><i className="fa-solid fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mb-2 mb-lg-0" >
                        {/* style={{ background: props.color }} */}
                        {/* <li className="nav-item ">
                            <a className="nav-link " aria-current="page" href="#">
                                <select id="currency" onchange="convertCurrency()">
                                    <option value="USD" >USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </a>
                        </li> */}
                        <li className="nav-item">

                            {/* <a className="nav-link" aria-current="page" onClick={handleLanguageClick}>
                                <FaGlobe />
                            </a> */}
                            <div className="dropdown">
                                {/* dropdown-toggle */}
                                <button className="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-language" style={{ fontSize: '18px' }}></i>
                                </button>
                                <ul className="dropdown-menu p-0">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => changeLanguage(language.code)}
                                            className="language-button w-100"
                                        >
                                            {language.label}
                                        </button>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a href={`tel:${props.HotelNumber}`} className="nav-link nav-icon" aria-current="page"><FaPhoneAlt /></a>
                        </li>

                        <li className="nav-item">
                            <a href={`mailto:${props.email}`} className="nav-link nav-icon" aria-current="page"><FaEnvelope /></a>
                        </li>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            {props.AuthenticatedUser ?
                                <GiHamburgerMenu size={24} onClick={handleMenu} cursor={"pointer"} />

                                :
                                <div className='d-flex gap-2'>


                                    <button onClick={handleLoginPopup} style={{ border: "none", padding: "5px 20px", borderRadius: "10px" }} className='loginbutton'>Login</button>
                                    <button onClick={handleRegisterPopup} style={{ border: "none", padding: "5px 20px", borderRadius: "10px" }} className='loginbutton'>Register</button>

                                </div>
                            }
                        </div>
                        {/* <li className="nav-item ">
                            <a className="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModal1">{t('Login')}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModal2">{t('Sign up')}</a>
                        </li> */}

                        {/* <li className="nav-item">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="toggleBtn" checked />
                                <button id="toggleBtn">hello</button>
                            </div>
                        </li> */}

                    </ul>
                </div>

                {isMenuOpen && <Navmenu setAuthenticatedUser={props.setAuthenticatedUser} />}

            </div>
        </nav>

    )
}

