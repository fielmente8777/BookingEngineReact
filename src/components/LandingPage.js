// import React from 'react'
import React, { useState } from 'react';
import Cards from './Cards';
import FullCalendar from './FullCalendar';
import FullCalendar1 from './FullCalendar1';
import Spinner from './Spinner';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import your i18n configuration



export default function Landing(props) {
    let [Headlines, setHeadlines] = useState([]);
    const [isOpen, setIsOpen] = useState(false);




    async function toggleDiv() {
        let checkin_date = localStorage.getItem("Checkin")
        let checkout_date = localStorage.getItem("Checkout")
        let adult = document.getElementById("adult").value;
        let kid = document.getElementById("kid").value;
        localStorage.setItem("Adult", adult);
        localStorage.setItem("Kid", kid);

        const response = await fetch(`${props.baseUrl}/room/${localStorage.getItem('hotelid')}`, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (json.Status === true) {
            document.getElementById("No_rooms").style.display = "none"
            document.getElementById("id_filters").style.display="block"
            setHeadlines((json.Details));
            console.log(json)

        } else {
            document.getElementById("No_rooms").style.display = "block"
        }




        setIsOpen(!isOpen);
    };
    const { t, i18n } = useTranslation();

    // Change the language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };



    return (
        <>
            <div  style={{width:"100%",objectFit:"cover",backgroundImage:`url(${props.Bg_image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
                <section classNameName={`section`}>
                    {/* style={{width:"100%",objectFit:"cover",backgroundImage:`url(${props.Bg_image})`,backgroundRepeat:"no-repeat" }} */}
                    <div className={`container form-main ${props.display}`} >
                        <div className="form">
                            <div className="reservation" style={{ background: props.color }}>
                                {/* <h4 >{props.ReservationLabel}</h4> */}
                                <h4>{t('Reservation')}</h4>
                                {/* style="font-weight: 700; margin-bottom: 0;" */}
                            </div>

                            <div className="form_inner">


                                <div className="form-rsv">

                                    <div className="main-dates">
                                        {/* <div className="checks d-flex">
                                            <label>Check In</label>
                                            <FullCalendar />
                                        </div>
                                        <div className="checks d-flex">
                                            <label>Check Out</label>
                                            <FullCalendar />
                                        </div> */}
                                        <div className="cal-labl">
                                            <label style={{ fontWeight: "bold" }}>{t('Check In')}</label>
                                            <label style={{ fontWeight: "bold" }}>{t('Check Out')}</label>
                                        </div>

                                        <div className="calendarDiv">
                                            <FullCalendar bg_color={props.bt_color} />
                                            <FullCalendar1 bg_color={props.bt_color} />
                                        </div>
                                    </div>
                                </div>



                                <div className="fill_detail">
                                    <div className="members">
                                        {/* We have to customize this color, this color will come form backend */}

                                        <div className="members_inner">
                                            <div className="details ">
                                                <label for="#">{t("Adult's")}</label>

                                                <select name="#" id="adult" className="options text-light" style={{ background: props.bt_color }}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>

                                            <div className="details d-flex s-det">
                                                <div className="child-gap d-flex flex-column align-items-center">
                                                    <label for="#">{t("Children")}</label>
                                                    <label for="#" className="upto">{t("Up to 12 years")}</label>


                                                    <select name="#" className="options text-light" id="kid" onchange="showDropdown()" style={{ background: props.bt_color }}>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="submit active d-flex">
                                {/* <!-- <input onclick="logPostData()" type="button">Look for Beds! onclick="logPostData()" --> */}
                                {/* <input onclick="logPostData()" type="button" value="Look for Beds!" /> */}
                                {/* <input onClick={toggleContent()} type="button" value="Look for Beds!" /> */}
                                {/* <button onClick={toggleDiv} style={{ background: props.color }}>{props.ReservationButton} </button> */}
                                <button onClick={toggleDiv} style={{ background: props.color }}>{t('Looks For Rooms')} </button>

                            </div>
                        </div>

                    </div>
                    {/* <div className="container">
                        <div className="middle-div">

                            <div className="why-book-us">
                                <h3>Why book with us?</h3>
                                <div className="why-land-aminit">
                                    <ul>
                                        <li><i className="fa-sharp fa-solid fa-dumbbell land-icons"></i>Fitnesss center</li>
                                        <li><i className="fa-solid fa-wheelchair land-icons"></i>Wheelchair Access</li>
                                        <li><i className="fa-solid fa-car land-icons"></i>Parking Access</li>
                                        <li><i className="fa-solid fa-utensils land-icons"></i>Well maintained Restaurant</li>
                                    </ul>
                                    <ul>
                                        <li><i className="fa-sharp fa-solid fa-tree-city land-icons"></i>Backyard Park</li>
                                        <li><i className="fa-solid fa-land-mine-on land-icons"></i>Danger Alarm</li>
                                        <li><i className="fa-solid fa-smoking land-icons"></i>Smoking Rooms</li>
                                        <li><i className="fa-solid fa-fire-extinguisher land-icons"></i>Fire Extiguisher</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </section>



                {/* {isOpen && (
                    <Cards />
                    
                )} */}
                <div className='' id="No_rooms" style={{ textAlign: "center", color: "grey", display: "none" }}>
                    <h3>{t('No rooms Available')}</h3>
                </div>
                <div className='container' id="id_filters" style={{display: "none" }}>
                    <div class="filters" style={{backgroundColor:props.color}}>
                        <div class="inner_filter">
                            <label>Show by</label>
                            <div class="roomBtn">
                                <buttton class="btn btn-secondary btn-fc">Rooms</buttton>
                                <buttton class="btn btn-secondary btn-fc">Rates</buttton>
                            </div>
                        </div>

                        <div className="crd-head">
                            <h3>select rooms</h3>
                        </div>

                        <div class="inner_filter rgt-flt">
                            <div class="dropdown">
                                <button class="btn btn-secondary btn-fc" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Room type
                                </button>
                                <ul class="dropdown-menu drp-lst">
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Havana Deluxe King
                                        Room</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Havana Deluxe Twin</a>
                                    </li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Havana Premier King
                                        Room</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Havana Twin King
                                        Room</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Havana Connecting
                                        Room</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> El Presidente Suite</a>
                                    </li>
                                </ul>

                            </div>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle btn-fc" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Special Offers
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> FLEXIBLE 24-HOURS STAY
                                        [Room Only]</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Early Saver [Room with
                                        Breakfast]</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> FLEXIBLE 24-HOURS STAY
                                        [Room with Breakfast]</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Monthly Deal</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Early Saver [Room
                                        Only]</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Staycation Offer [Room
                                        with Breakfast]l</a></li>
                                    <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Staycation Offer [Room
                                        Only]</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle btn-fc" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Filters
                                </button>
                                <ul class="dropdown-menu rightopn">
                                    <div class="fc-rt d-flex">
                                        <div class="left-dropdown">
                                            <div class="status">
                                                <h6 class="mx-3">Status</h6>
                                                <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Hide unable
                                                    to book</a></li>
                                            </div>
                                            <div class="drop-feature">
                                                <h6 class="mx-3">Room Features</h6>
                                                <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Balcony</a>
                                                </li>
                                                <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Bathtub
                                                </a></li>
                                            </div>
                                        </div>
                                        <div class="right-dropdown">
                                            <h6 class="mx-3">Benefits</h6>
                                            <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> No breakfast</a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Internet
                                            </a></li>
                                            <li><a class="dropdown-item" href="#"><input type="checkbox" name="" id="" /> Pay later</a>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {Headlines.map((element) => {
                    
                    return <div key={element.url}>
                        <Cards
                            name={element.roomName ? element.roomName.slice(0, 80) : ""}
                            description={element.roomDescription ? element.roomDescription.slice(0, 80) : ""}
                            available={element.noOfRooms}
                            price={element.price ? element.price : ""}
                            roomtype={element.roomType}
                            type = {element.roomTypeName}
                            facilities={element.roomFacilities}
                            images={element.roomImage}
                            color={props.color}
                            FinalConfirmButton={props.FinalConfirmButton}
                            Paymentbutton={props.Paymentbutton}
                            Bg_color = {props.Bg_color}
                            HotelName = {props.HotelName}
                            HotelLogo = {props.HotelLogo}
                            setPayment={props.setPayment}
                        />

                    </div>
                })}
            </div>
        </>
    )
}
