// import React from 'react'
import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import FullCalendar from './FullCalendar';
import FullCalendar1 from './FullCalendar1';
import Spinner from './Spinner';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import your i18n configuration
import SuccessPage from './SuccessPage';
import Contactinfo from './CnfrmPay'
import Mealplan from './Mealplan';



export default function Landing(props) {
    const [Adult, setAdult] = useState(0)
    let [Headlines, setHeadlines] = useState([]);
    let [Reservebtn, setReservebtn] = useState(false);
    let [ratesChange, setratesChange] = useState({});
    const [Delux, setDelux] = useState(0)
    const [SuperDelux, setSuperDelux] = useState(0)
    const [Suite, setSuite] = useState(0)
    const [Premium, setPremium] = useState(0)


    const [DeluxAdult, setDeluxAdult] = useState(0)
    const [SuperDeluxAdult, setSuperDeluxAdult] = useState(0)
    const [SuiteAdult, setSuiteAdult] = useState(0)
    const [PremiumAdult, setPremiumAdult] = useState(0)

    const [Night, setNights] = useState(0)
    let [maxAdult, setmaxAdult] = useState(0)

    const [CradisOpen, setCardsIsOpen] = useState(false);

    const [isperRoom,setisperRoom] = useState(false)
    const [mealplan, setMealPlan] = useState([]);
    const [mealplanId,setmealplanId] = useState('')
    const [selectedMealPlan,setselectedMealPlan] = useState('')
    const [selectedMealPlanPrice,setselectedMealPlanPrice] = useState('0')
    const [Mealprice,setMealprice] = useState(0)


    const [isOpen, setisOpen] = useState(false)
    const [Available, setAvailable] = useState({
        "DELUX": 0,
        "PREMIUM": 0,
        "SUITE": 0,
        "SUPERDELUX": 0
    })

    const [RoomNameAvailable, setRoomNameAvailable] = useState({
        "DELUX": "DELUX",
        "PREMIUM": "PREMIUM",
        "SUITE": "SUITE",
        "SUPER DELUX": "SUPERDELUX"
    })
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (dataLoaded) {
            scrollToRoomsSection();
        }
    }, [dataLoaded]);
    const [openAlert, setopenAlert] = useState(false)
    const [date, setDate] = useState(new Date());

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [tomorrowdate, setTomorrowDate] = useState(tomorrow);

    const adultKidChange = () => {
        let adult = document.getElementById("adult").value;
        let kid = document.getElementById("kid").value;
        setAdult(adult)
        localStorage.setItem("Adult", adult);
        localStorage.setItem("Kid", kid);
    }

    function scrollToRoomsSection() {
        const roomsSection = document.getElementById("id_filters");
        if (roomsSection) {
            const yOffset = roomsSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: yOffset, behavior: 'smooth' }); // You can use 'smooth' for smooth scrolling
        }
    }

    async function toggleDiv() {
        let checkin_date = localStorage.getItem("Checkin")
        let checkout_date = localStorage.getItem("Checkout")

        var date1 = new Date(localStorage.getItem("Checkin"));
        var date2 = new Date(localStorage.getItem("Checkout"));
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        setNights(Difference_In_Days);
        let adult = document.getElementById("adult").value;
        setAdult(adult)
        let kid = document.getElementById("kid").value;
        localStorage.setItem("Adult", adult);
        localStorage.setItem("Kid", kid);

        const response = await fetch(`${props.baseUrl}/room/${localStorage.getItem('hotelid')}`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "Checkin": checkin_date, "Checkout": checkout_date })
        });


        const json = await response.json();

        if (json.Status === true) {
            document.getElementById("No_rooms").style.display = "none"
            document.getElementById("id_filters").style.display = "block"
            setReservebtn(true)
            setHeadlines((json.Details));
            setratesChange(json.Price)
            setDataLoaded(true);

            // Scroll to the rooms section
            scrollToRoomsSection();

        } else {
            document.getElementById("No_rooms").style.display = "block"
        }

        const response1 = await fetch(`${props.baseUrl}/booking/availablity`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ndid": localStorage.getItem('hotelid'),
                "checkin": checkin_date,
                "checkout": checkout_date
            })
        });
        const json1 = await response1.json();
        setAvailable(json1.Avaiblity)



        setCardsIsOpen(true);
    };

    const { t, i18n } = useTranslation();

    // Change the language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };



    function BookingFinalize() {
        maxAdult = 0
        if (Delux > 0) { setmaxAdult(maxAdult += Delux * DeluxAdult) }
        if (SuperDelux > 0) { setmaxAdult(maxAdult += SuperDelux * SuperDeluxAdult) }
        if (Suite > 0) { setmaxAdult(maxAdult += Suite * SuiteAdult) }
        if (Premium > 0) { setmaxAdult(maxAdult += Premium * PremiumAdult) }
        if (Adult <= maxAdult) {
            setisOpen(true)
            setReservebtn(false)
            setopenAlert(false)
        }
        else {
            setisOpen(false)
            setopenAlert(true)
            setInterval(() => {
                setopenAlert(false)
            }, 4000)
        }
    }



    // for right side get price popup 

    const [isOpen1, setIsOpen1] = useState(false);

    const openPopup = () => {
        setIsOpen1(true);
    };

    const closePopup = () => {
        setIsOpen1(false);
    };

    const popupStyle = {
        right: isOpen1 ? '0' : '-300px',
    };


    return (
        <>
            {/* backgroundImage: `url(${props.Bg_image})`, */}
            <div className='LandinMain' style={{ width: "100%", objectFit: "cover", background: "#20527E", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

                <div class="right-email">
                    <button id="open-popupRight" onClick={openPopup}><i class="fa-regular fa-envelope"></i></button>
                    <div class="popupRight" id="popupRight" style={popupStyle}>
                        <div class="popupRight-content">
                            <button id="close-popupRight" onClick={closePopup}><i class="fa-solid fa-xmark"></i></button>
                            <p style={{ textAlign: 'center' }}><strong>Get these prices emailed to you!.</strong></p>
                            <input type="email" name="email" id="offerEmail" />
                            <button class="sendPrice" onClick={closePopup} style={{ border: '0' }}>Send me the price</button>
                            <p style={{ textAlign: 'center' }}>No spam ever, promise!</p>
                        </div>
                    </div>
                </div>

                <section className={`section`}>
                    {/* style={{width:"100%",objectFit:"cover",backgroundImage:`url(${props.Bg_image})`,backgroundRepeat:"no-repeat" }} */}
                    <div className={`container form-main ${props.display}`} >
                        <div className="form">
                            <div className="reservation" style={{ background: props.color }}>
                                {/* <h4 >{props.ReservationLabel}</h4> */}
                                <h4>{t(props.ReservationLabel)}</h4>
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
                                            <FullCalendar bg_color={props.bt_color} checkinDate={date} setcheckinDate={setDate} setcheckoutDate={setTomorrowDate} toggleDiv={toggleDiv} />
                                            <FullCalendar1 bg_color={props.bt_color} checkoutDate={tomorrowdate} setcheckoutDate={setTomorrowDate} checkinDate={date} toggleDiv={toggleDiv} />
                                        </div>
                                    </div>
                                </div>



                                <div className="fill_detail">
                                    <div className="members">
                                        {/* We have to customize this color, this color will come form backend */}

                                        <div className="members_inner">
                                            <div className="details ">
                                                <label for="#">{t("Adult's")}</label>

                                                <select name="#" id="adult" onChange={adultKidChange} className="options text-light " style={{ background: props.bt_color }}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
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
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
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
                                <button onClick={toggleDiv} style={{ background: props.color }}>{t(props.ReservationButton)} </button>

                            </div>
                        </div>

                    </div>
                    <div className={`container ${props.display}`}>
                        <div className="middle-div">

                            <div className="why-book-us">
                                <h3>{t("Why book with us?")}</h3>
                                <div className="why-land-aminit">
                                    <ul>
                                        <li><i className="fa-sharp fa-solid fa-tree-city land-icons"></i>Backyard Park</li>
                                        {/* <li><i className="fa-sharp fa-solid fa-dumbbell land-icons"></i>Fitnesss center</li>
                                        <li><i className="fa-solid fa-wheelchair land-icons"></i>Wheelchair Access</li> */}
                                        <li><i className="fa-solid fa-car land-icons"></i>Parking Access</li>
                                        <li><i className="fa-solid fa-utensils land-icons"></i>Restaurant</li>
                                    </ul>
                                    <ul>
                                        {/* <li><i className="fa-sharp fa-solid fa-tree-city land-icons"></i>Backyard Park</li> */}
                                        <li><i className="fa-solid fa-land-mine-on land-icons"></i>Danger Alarm</li>
                                        <li><i className="fa-solid fa-smoking land-icons"></i>Smoking Rooms</li>
                                        <li><i className="fa-solid fa-fire-extinguisher land-icons"></i>Fire Extiguisher</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* {isOpen && (
                    <Cards />
                    
                )} */}
                <div className='cardDiv' id="No_rooms" style={{ textAlign: "center", color: "grey", display: "none" }}>
                    <h3>{t('No rooms Available')}</h3>
                </div>
                <div className='container' id="id_filters" style={{ display: "none" }}>
                    <div class="filters" style={{ backgroundColor: props.color }}>
                        {/* <div class="inner_filter">
                            <label>Show by</label>
                            <div class="roomBtn">
                                <buttton class="btn btn-secondary btn-fc">Rooms</buttton>
                                <buttton class="btn btn-secondary btn-fc">Rates</buttton>
                            </div>
                        </div> */}

                        <div className="crd-head w-100">
                            <h3 style={{ textAlign: 'center' }}>select rooms</h3>
                        </div>

                        {/* <div class="inner_filter rgt-flt">
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
                        </div> */}
                    </div>
                </div>
                {Headlines.map((element) => {
                    return <div key={element.url} >
                        <Cards
                            name={element.roomName ? element.roomName.slice(0, 80) : ""}
                            description={element.roomDescription ? element.roomDescription : ""}
                            available={Available[RoomNameAvailable[element.roomTypeName]]}
                            price={element.price ? element.price : ""}
                            ratechange={ratesChange}
                            roomtype={element.roomType}
                            Adult={element.adult}
                            type={element.roomTypeName}
                            facilities={element.roomFacilities}
                            images={element.roomImage}
                            color={props.color}
                            FinalConfirmButton={props.FinalConfirmButton}
                            Paymentbutton={props.Paymentbutton}
                            Bg_color={props.Bg_color}
                            HotelName={props.HotelName}
                            HotelLogo={props.HotelLogo}
                            setPayment={props.setPayment}
                            setDelux={setDelux}
                            setSuperDelux={setSuperDelux}
                            setSuite={setSuite}
                            setPremium={setPremium}
                            setDeluxAdult={setDeluxAdult}
                            setSuperDeluxAdult={setSuperDeluxAdult}
                            setSuiteAdult={setSuiteAdult}
                            setPremiumAdult={setPremiumAdult}
                            setisOpen={setisOpen}
                            BookingFinalize={BookingFinalize}
                        />

                        


                    </div>



                })}

                {(Delux !== 0 || SuperDelux !== 0 || Suite !== 0 || Premium !== 0)?
                <Mealplan setisperRoom={setisperRoom} 
                setmealplanId={setmealplanId}
                mealplan={mealplan}
                setMealPlan={setMealPlan} 
                setselectedMealPlan={setselectedMealPlan} 
                setselectedMealPlanPrice={setselectedMealPlanPrice} 
                Mealprice={Mealprice} 
                setMealprice={setMealprice}
                Delux={Delux}
                SuperDelux={SuperDelux}
                Suite={Suite}
                Premium={Premium}
                Adult={Adult}
                isperRoom={isperRoom} />:""}

                <div className='container'>
                    {(Delux !== 0 || SuperDelux !== 0 || Suite !== 0 || Premium !== 0)
                        ? <button className='ReserveButtonForPayment' onClick={BookingFinalize}>{props.FinalConfirmButton}</button> : ""}
                </div>


                {isOpen && (Delux !== 0 || SuperDelux !== 0 || Suite !== 0 || Premium !== 0) ? (
                    
                    <Contactinfo setIsOpen={1} Bg_color={props.Bg_color} setPayment={props.setPayment}
                        HotelName={props.HotelName} HotelLogo={props.HotelLogo} BookingTax={1200}
                        BookingTotalPrice={1200} BookingPrice={1200}
                        Paymentbutton={props.Paymentbutton} nights={Night} room={1}
                        color={props.color} price={1} grandtotal={1} type={props.roomtype}
                        Delux={Delux}
                        SuperDelux={SuperDelux}
                        Suite={Suite}
                        Premium={Premium}
                        ratesChange={ratesChange}
                        Adult={Adult}
                        maxAdult={maxAdult}
                        setmaxAdult={setmaxAdult}
                        DeluxAdult={DeluxAdult}
                        SuperDeluxAdult={SuperDeluxAdult}
                        SuiteAdult={SuiteAdult}
                        PremiumAdult={PremiumAdult}
                        selectedMealPlan={selectedMealPlan}
                        selectedMealPlanPrice={selectedMealPlanPrice}
                        isperRoom={isperRoom}
                        Mealprice={Mealprice}
                        mealplanId={mealplanId}
                        
                    />
                ) : ""}
                {openAlert ?
                    <div class="alert alert-danger alertDiv" role="alert">

                        Please Select More Rooms
                    </div> : ""}


            </div>
        </>
    )
}
