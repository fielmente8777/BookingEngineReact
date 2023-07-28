import React from 'react';
import PropTypes from 'prop-types';
import { FaEnvelope, FaPhoneAlt, FaGlobe } from "react-icons/fa";

export default function Navbar(props) {
    return (

        <nav class={`navbar navbar-expand-lg ${props.display}`} style={{background:props.color}}>
            <div class="container navbar">
                <div class="nav-logo">
                    <img src={props.logo}
                        alt="logo" />
                </div>
                <a class="navbar-brand" href="#" style={{ color: '#fff', fontWeight: '500' }} >{props.hotelname}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{ color: "#fff" }}><i class="fa-solid fa-bars"></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav mb-2 mb-lg-0" style={{background:props.color}}>

                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">
                                <select id="currency" onchange="convertCurrency()">
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page"><FaGlobe />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="tel:9582897050" class="nav-link nav-icon" aria-current="page" target="_blank"><FaPhoneAlt /></a>
                        </li>

                        <li class="nav-item">
                            <a href="https://mail.google.com/" class="nav-link nav-icon" aria-current="page" target="_blank"><FaEnvelope /></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModal1">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModal2">Sign up</a>
                        </li>

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

