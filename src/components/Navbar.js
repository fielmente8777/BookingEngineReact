import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import AuthContext from '../context/AuthProvider';
import './i18n'; // Import your i18n configuration




export default function Navbar(props) {


    const { openLoginPopup, setOpenLoginPopup } = useContext(AuthContext)
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    const handleLoginPopup = () => {
        setOpenLoginPopup(true);
    }

    const handleLogoutPopup = ()=>{
        localStorage.clear()
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
    return (

        <nav class={`navbar navbar-expand-lg ${props.display}`} style={{ background: props.color }}>
            <div class="container navbar">
                <div class="nav-logo">
                    <a href={props.hotelwebsite}><img src={props.logo}
                        alt="logo" /></a>
                </div>


                {/* <a class="navbar-brand" href="#" style={{ color: '#fff', fontWeight: '500' }} >{props.hotelname}</a> */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ color: "#fff" }}><i class="fa-solid fa-bars"></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav mb-2 mb-lg-0" >
                        {/* style={{ background: props.color }} */}
                        {/* <li class="nav-item ">
                            <a class="nav-link " aria-current="page" href="#">
                                <select id="currency" onchange="convertCurrency()">
                                    <option value="USD" >USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </a>
                        </li> */}
                        <li class="nav-item">

                            {/* <a class="nav-link" aria-current="page" onClick={handleLanguageClick}>
                                <FaGlobe />
                            </a> */}
                            <div class="dropdown">
                                {/* dropdown-toggle */}
                                <button class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-language" style={{ fontSize: '18px' }}></i>
                                </button>
                                <ul class="dropdown-menu p-0">
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

                        <li class="nav-item">
                            <a href={`tel:${props.HotelNumber}`} class="nav-link nav-icon" aria-current="page"><FaPhoneAlt /></a>
                        </li>

                        <li class="nav-item">
                            <a href={`mailto:${props.email}`} class="nav-link nav-icon" aria-current="page"><FaEnvelope /></a>
                        </li>

                        {props.AuthenticatedUser?<button onClick={handleLogoutPopup} class='loginbutton'>Logout</button>:<button onClick={handleLoginPopup} class='loginbutton'>Login</button>}
                        {/* <li class="nav-item ">
                            <a class="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModal1">{t('Login')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModal2">{t('Sign up')}</a>
                        </li> */}

                        {/* <li class="nav-item">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="toggleBtn" checked />
                                <button id="toggleBtn">hello</button>
                            </div>
                        </li> */}

                    </ul>
                </div>

            </div>
        </nav>

    )
}

