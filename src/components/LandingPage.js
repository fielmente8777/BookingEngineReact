// import React from 'react'
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Adpackage from "./Adpackage";
import Cards from "./Cards";
import Contactinfo from "./CnfrmPay";
import Enquiryform from "./Enquiry";
import FullCalendar from "./FullCalendar";
import FullCalendar1 from "./FullCalendar1";
import Mealplan from "./Mealplan";
import "./i18n"; // Import your i18n configuration
import Banner from "./Banner";
import Overview from "./Overview";
import { FaBed, FaDashcube } from "react-icons/fa";
import { BoxIcon } from "../utils/icons";

export default function Landing(props) {
  const { websiteData, hotelDetails } = props;
  console.log(websiteData);
  const [Adult, setAdult] = useState(0);
  let [Headlines, setHeadlines] = useState([]);
  let [Reservebtn, setReservebtn] = useState(false);
  let [ratesChange, setratesChange] = useState({});
  const [Delux, setDelux] = useState(0);
  const [SuperDelux, setSuperDelux] = useState(0);
  const [Suite, setSuite] = useState(0);
  const [Premium, setPremium] = useState(0);
  const [PremiereRetreat, setPremiereRetreat] = useState(0);
  const [EliteSuite, setEliteSuite] = useState(0);
  const [GrandDeluxe, setGrandDeluxe] = useState(0);
  const [ImperialSuite, setImperialSuite] = useState(0);
  const [SupremeRetreat, setSupremeRetreat] = useState(0);
  const [RoyalDeluxe, setRoyalDeluxe] = useState(0);
  const [PrestigeSuite, setPrestigeSuite] = useState(0);
  const [ExclusiveRetreat, setExclusiveRetreat] = useState(0);

  const [DeluxAdult, setDeluxAdult] = useState(0);
  const [SuperDeluxAdult, setSuperDeluxAdult] = useState(0);
  const [SuiteAdult, setSuiteAdult] = useState(0);
  const [PremiumAdult, setPremiumAdult] = useState(0);
  const [PremiereRetreatAdult, setPremiereRetreatAdult] = useState(0);
  const [EliteSuiteAdult, setEliteSuiteAdult] = useState(0);
  const [GrandDeluxeAdult, setGrandDeluxeAdult] = useState(0);
  const [ImperialSuiteAdult, setImperialSuiteAdult] = useState(0);
  const [SupremeRetreatAdult, setSupremeRetreatAdult] = useState(0);
  const [RoyalDeluxeAdult, setRoyalDeluxeAdult] = useState(0);
  const [PrestigeSuiteAdult, setPrestigeSuiteAdult] = useState(0);
  const [ExclusiveRetreatAdult, setExclusiveRetreatAdult] = useState(0);

  const [RoomCategoryCombination, setRoomCategoryCombination] = useState({
    DELUX: "-",
    SUPERDELUX: "-",
    SUITE: "-",
    PREMIUM: "-",
    PremiereRetreat: "-",
    EliteSuite: "-",
    GrandDeluxe: "-",
    ImperialSuite: "-",
    SupremeRetreat: "-",
    RoyalDeluxe: "-",
    PrestigeSuite: "-",
    ExclusiveRetreat: "-",
  });
  const [Night, setNights] = useState(0);
  let [maxAdult, setmaxAdult] = useState(0);

  const [CradisOpen, setCardsIsOpen] = useState(false);
  // rooms/package
  const [islookingroom, setislookingroom] = useState(true);
  // Meal packages
  const [isperRoom, setisperRoom] = useState(false);
  const [mealplan, setMealPlan] = useState([]);
  const [mealplanId, setmealplanId] = useState("");
  const [selectedMealPlan, setselectedMealPlan] = useState("");
  const [selectedMealPlanPrice, setselectedMealPlanPrice] = useState("0");
  const [Mealprice, setMealprice] = useState(0);

  // Ads Packages
  const [Packages, setPackages] = useState([]);

  //Multi-Locations
  const [HotelLocations, setHotelLocations] = useState([]);

  const [isOpen, setisOpen] = useState(false);
  const [Available, setAvailable] = useState({
    DELUX: 0,
    PREMIUM: 0,
    SUITE: 0,
    SUPERDELUX: 0,
    PremiereRetreat: 0,
    EliteSuite: 0,
    GrandDeluxe: 0,
    ImperialSuite: 0,
    SupremeRetreat: 0,
    RoyalDeluxe: 0,
    PrestigeSuite: 0,
    ExclusiveRetreat: 0,
  });

  const [RoomNameAvailable, setRoomNameAvailable] = useState({
    DELUX: "DELUX",
    PREMIUM: "PREMIUM",
    SUITE: "SUITE",
    "SUPER DELUX": "SUPERDELUX",
    "Premiere Retreat": "PremiereRetreat",
    "Elite Suite": "EliteSuite",
    "Grand Deluxe": "GrandDeluxe",
    "Imperial Suite": "ImperialSuite",
    "Supreme Retreat": "SupremeRetreat",
    "Royal Deluxe": "RoyalDeluxe",
    "Prestige Suite": "PrestigeSuite",
    "Exclusive Retreat": "ExclusiveRetreat",
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (dataLoaded) {
      scrollToRoomsSection();
    }
    getallLocations();
  }, [dataLoaded]);

  const [openAlert, setopenAlert] = useState(false);
  const [date, setDate] = useState(new Date());

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [tomorrowdate, setTomorrowDate] = useState(tomorrow);

  const adultKidChange = () => {
    let adult = document.getElementById("adult").value;
    let kid = document.getElementById("kid").value;
    setAdult(adult);
    localStorage.setItem("Adult", adult);
    localStorage.setItem("Kid", kid);
  };

  const HotelLocationChange = () => {
    let locationId = document.getElementById("hotelLocation").value;
    let urlParams = new URLSearchParams(window.location.search);

    // Set or update the 'locationId' parameter
    urlParams.set("hid", locationId);

    // Get the updated URL with the new parameters
    let newUrl = window.location.pathname + "?" + urlParams.toString();

    // window.location.href = newUrl;
    localStorage.setItem("hid", locationId);
    toggleDiv();
    window.history.replaceState({}, "", newUrl);
  };

  const getallLocations = async () => {
    const response = await fetch(
      `${props.baseUrl}/multilocation/findlocations/engine/${localStorage.getItem("hotelid")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    const resp = json.Locations;
    setHotelLocations(resp);
  };

  function scrollToRoomsSection() {
    // const roomsSection = document.getElementById("id_filters");
    // if (roomsSection) {
    //   const yOffset = roomsSection.getBoundingClientRect().top + window.scrollY;
    //   window.scrollTo({ top: yOffset, behavior: "smooth" }); // You can use 'smooth' for smooth scrolling
    // }
  }

  const FetchMeals = async () => {
    const response = await fetch(
      `${props.baseUrl}/mpackage/packages/engine/${localStorage.getItem("hotelid")}/${localStorage.getItem("hid")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    setMealPlan(json.Packages);
  };

  async function toggleDiv() {
    let checkin_date = localStorage.getItem("Checkin");
    let checkout_date = localStorage.getItem("Checkout");

    var date1 = new Date(localStorage.getItem("Checkin"));
    var date2 = new Date(localStorage.getItem("Checkout"));
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setNights(Difference_In_Days);
    let adult = document.getElementById("adult").value;
    setAdult(adult);
    let kid = document.getElementById("kid").value;
    localStorage.setItem("Adult", adult);
    localStorage.setItem("Kid", kid);

    const response = await fetch(
      `${props.baseUrl}/room/engine/${localStorage.getItem("hotelid")}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkIn: checkin_date,
          checkOut: checkout_date,
          hId: localStorage.getItem("hid"),
        }),
      }
    );

    const response2 = await fetch(
      `${props.baseUrl}/rpackage/ad/packages/engine/${localStorage.getItem("hotelid")}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hId: localStorage.getItem("hid"),
          checkin: checkin_date,
          checkout: checkout_date,
        }),
      }
    );

    FetchMeals();

    const json = await response.json();
    const json2 = await response2.json();

    if (json.Status === true) {
      document.getElementById("No_rooms").style.display = "none";
      document.getElementById("id_filters").style.display = "block";
      setReservebtn(true);
      setHeadlines(json.Details);
      setratesChange(json.Price);
      setPackages(json2.Packages);
      setDataLoaded(true);

      // Scroll to the rooms section
      scrollToRoomsSection();
    } else {
      document.getElementById("No_rooms").style.display = "block";
    }

    const response1 = await fetch(`${props.baseUrl}/booking/availablity`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hId: localStorage.getItem("hid"),
        ndid: localStorage.getItem("hotelid"),
        checkin: checkin_date,
        checkout: checkout_date,
      }),
    });
    const json1 = await response1.json();
    setAvailable(json1.Avaiblity);

    setCardsIsOpen(true);
  }

  const { t, i18n } = useTranslation();

  // Change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  function BookingFinalize() {
    maxAdult = 0;
    if (Delux > 0) {
      setmaxAdult((maxAdult += Delux * DeluxAdult));
    }
    if (SuperDelux > 0) {
      setmaxAdult((maxAdult += SuperDelux * SuperDeluxAdult));
    }
    if (Suite > 0) {
      setmaxAdult((maxAdult += Suite * SuiteAdult));
    }
    if (Premium > 0) {
      setmaxAdult((maxAdult += Premium * PremiumAdult));
    }
    if (PremiereRetreat > 0) {
      setmaxAdult((maxAdult += PremiereRetreat * PremiereRetreatAdult));
    }
    if (EliteSuite > 0) {
      setmaxAdult((maxAdult += EliteSuite * EliteSuiteAdult));
    }
    if (GrandDeluxe > 0) {
      setmaxAdult((maxAdult += GrandDeluxe * GrandDeluxeAdult));
    }
    if (ImperialSuite > 0) {
      setmaxAdult((maxAdult += ImperialSuite * ImperialSuiteAdult));
    }
    if (SupremeRetreat > 0) {
      setmaxAdult((maxAdult += SupremeRetreat * SupremeRetreatAdult));
    }
    if (RoyalDeluxe > 0) {
      setmaxAdult((maxAdult += RoyalDeluxe * RoyalDeluxeAdult));
    }
    if (PrestigeSuite > 0) {
      setmaxAdult((maxAdult += PrestigeSuite * PrestigeSuiteAdult));
    }
    if (ExclusiveRetreat > 0) {
      setmaxAdult((maxAdult += ExclusiveRetreat * ExclusiveRetreatAdult));
    }
    if (Adult <= maxAdult) {
      setisOpen(true);
      setReservebtn(false);
      setopenAlert(false);
    } else {
      setisOpen(false);
      setopenAlert(true);
      setInterval(() => {
        setopenAlert(false);
      }, 4000);
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
    right: isOpen1 ? "0" : "-300px",
  };

  useEffect(() => {
    toggleDiv();
  }, []);
  return (
    <div className="max_width">
      <div className="grid grid-cols-5 max_screen_width gap-16">
        <div className="col-span-3">
          <Overview hotelDetails={hotelDetails} />
        </div>

        {/* Booking Summary */}
        <div className="bg-[#000000] p-4 shadow-lg col-span-2 border-2 mt-28 rounded-3xl h-fit border-dark">
          <span className="border-[0.5px] border-gray-400 backdrop-blur-md bg-white/20 px-3 py-2 text-white rounded-full flex items-center gap-1 w-fit">
            <BoxIcon /> Booking Summary
          </span>

          <div className="">
            {HotelLocations.length > 1 ? (
              <div className="">
                <div className=" flex flex-col">
                  <label for="#" className="text-white mt-10 text-lg mb-2">
                    Locations
                  </label>

                  <select
                    name="#"
                    id="hotelLocation"
                    onChange={() => {
                      HotelLocationChange();
                    }}
                    className="py-3 outline-none rounded-2xl px-4 text-white bg-[#181A1D]"
                  >
                    {HotelLocations.map((area) => {
                      const isSelected =
                        area.hId === localStorage.getItem("hid");
                      return (
                        <option
                          key={area.hId}
                          value={area.hId}
                          selected={isSelected}
                        >
                          {area.city}, {area.state}, {area.country}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="grid grid-cols-2 w-full mt-4 gap-3">
              <div>
                <label className="text-white text-base! mb-2">
                  {t("Check In")}
                </label>
                <FullCalendar
                  bg_color={props.bt_color}
                  checkinDate={date}
                  setcheckinDate={setDate}
                  setcheckoutDate={setTomorrowDate}
                  toggleDiv={toggleDiv}
                />
              </div>
              <div>
                <label className="text-white text-base! mb-2">
                  {t("Check Out")}
                </label>
                <FullCalendar1
                  bg_color={props.bt_color}
                  checkoutDate={tomorrowdate}
                  setcheckoutDate={setTomorrowDate}
                  checkinDate={date}
                  toggleDiv={toggleDiv}
                />
              </div>
            </div>

            <div className="mt-8">
              {/* We have to customize this color, this color will come form backend */}
              <p className="text-white text-lg mb-2">Guest </p>
              <div className=" outline-none rounded-2xl gap-4 flex items-center p-4 text-white bg-[#181A1D]">
                <div className="">
                  <select
                    name="#"
                    id="adult"
                    onChange={adultKidChange}
                    value={Adult}
                    className=" bg-[#181A1D] outline-none appearance-none px-2"
                    // style={{ background: props.bt_color }}
                  >
                    {/* <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option> */}
                    {Array.from({ length: 12 }, (_, index) => (
                      <option key={index + 1} value={index + 1} className="w-8">
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="adult" className=" text-white">
                    {t("Adult's")}
                  </label>
                </div>
                <div className="">
                  <select
                    name="#"
                    id="kid"
                    onchange="showDropdown()"
                    className=" bg-[#181A1D] outline-none appearance-none px-2"
                  >
                    {/* <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option> */}
                    {Array.from({ length: 8 }, (_, index) => (
                      <option key={index} value={index} className="w-8">
                        {index}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="kid" className=" text-white">
                    {t("Children")} {t("(Up to 12 years)")}
                  </label>
                </div>
                {/* <label for="#" className=""></label> */}
              </div>
            </div>
          </div>
          <button
            onClick={toggleDiv}
            className="text-xl font-medium  text-white py-[14px] px-4 bg-[#0D54EB] w-full rounded-2xl mt-8"
          >
            {/* {t(props.ReservationButton)}{" "} */}
            Check Availability
          </button>
        </div>
      </div>
      <div>
        <div className="right-email">
          <button id="open-popupRight" onClick={openPopup}>
            <i className="fa-regular fa-envelope"></i>
          </button>
          <div className="popupRight" id="popupRight" style={popupStyle}>
            <div className="popupRight-content">
              <button id="close-popupRight" onClick={closePopup}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <p style={{ textAlign: "center" }}>
                <strong>Get these prices emailed to you!.</strong>
              </p>
              <input type="email" name="email" id="offerEmail" />
              <button
                className="sendPrice"
                onClick={closePopup}
                style={{ border: "0" }}
              >
                Send me the price
              </button>
              <p style={{ textAlign: "center" }}>No spam ever, promise!</p>
            </div>
          </div>
        </div>

        <section className={`section`}>
          {/* <div className={`container ${props.display}`}>
            <div className="middle-div">
              <div className="why-book-us">
                <h3>{t("Why book with us?")}</h3>
                <div className="why-land-aminit">
                  <ul>
                    <li>
                      <i className="fa-sharp fa-solid fa-tree-city land-icons"></i>
                      Backyard Park
                    </li>
                    <li>
                      <i className="fa-solid fa-car land-icons"></i>Parking
                      Access
                    </li>
                    <li>
                      <i className="fa-solid fa-utensils land-icons"></i>
                      Restaurant
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <i className="fa-solid fa-land-mine-on land-icons"></i>
                      Danger Alarm
                    </li>
                    <li>
                      <i className="fa-solid fa-ban-smoking land-icons"></i>
                      Non-Smoking Rooms
                    </li>
                    <li>
                      <i className="fa-solid fa-fire-extinguisher land-icons"></i>
                      Fire Extiguisher
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </section>

        <div
          className=""
          id="No_rooms"
          // style={{
          //   textAlign: "center",
          //   color: "grey",
          //   display: "none",
          //   background: props.Bg_color,
          // }}
        >
          <h3>{t("No rooms Available")}</h3>
        </div>

        <div className="" id="id_filters" style={{ display: "none" }}>
          <div className="mt-10">
            {Headlines.length !== 0 ? (
              islookingroom ? (
                <span className="py-2 flex items-center gap-2 w-full text-black text-md font-semibold rounded-md">
                  <FaBed size={18} />
                  Accommodation
                </span>
              ) : (
                <span
                  className="py-2 flex items-center gap-2 w-full text-black text-md font-semibold rounded-md"
                  onClick={() => {
                    setislookingroom(true);
                  }}
                >
                  <FaBed size={18} />
                  Accommodation
                </span>
              )
            ) : (
              ""
            )}

            {/* {Packages.length !== 0 ? (
                !islookingroom ? (
                  <span className="py-2 flex w-full bg-[#0D54EB] text-white rounded-md justify-center">Packages</span>
                ) : (
                  <span
                    className="py-2 flex w-full bg-black text-white rounded-md justify-center"
                    onClick={() => {
                      setislookingroom(false);
                    }}
                  >
                    Packages
                  </span>
                )
              ) : (
                ""
              )} */}
          </div>
          <div className=" bg-dark">
            {/* <div className="inner_filter">
                                <label>Show by</label>
                                <div className="roomBtn">
                                    <buttton className="btn btn-secondary btn-fc">Rooms</buttton>
                                    <buttton className="btn btn-secondary btn-fc">Rates</buttton>
                                </div>
                            </div> */}
            {/* {Headlines.length !== 0 ? (
                <div className="crd-head w-100">
                  <h3 style={{ textAlign: "center" }}>
                    <strong>select rooms</strong>
                  </h3>
                </div>
              ) : (
                <div className="crd-head w-100">
                  <h3 style={{ textAlign: "center" }}>No Rooms Available</h3>
                </div>
              )} */}
          </div>
        </div>

        {islookingroom ? (
          <div className="mt-3">
            {Headlines.sort(
              (a, b) =>
                (parseInt(a.price, 10) || 0) - (parseInt(b.price, 10) || 0)
            ).map((element) => {
              return (
                <div key={element.url}>
                  <Cards
                    baseUrl={props.baseUrl}
                    currency={props.currency}
                    name={element.roomName ? element.roomName.slice(0, 80) : ""}
                    description={
                      element.roomDescription ? element.roomDescription : ""
                    }
                    available={
                      Available[RoomNameAvailable[element.roomTypeName]]
                    }
                    price={element.price ? element.price : ""}
                    ratechange={ratesChange}
                    roomtype={element.roomType}
                    Adult={element.adult}
                    a={Available}
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
                    setPremiereRetreat={setPremiereRetreat}
                    setEliteSuite={setEliteSuite}
                    setGrandDeluxe={setGrandDeluxe}
                    setImperialSuite={setImperialSuite}
                    setSupremeRetreat={setSupremeRetreat}
                    setRoyalDeluxe={setRoyalDeluxe}
                    setPrestigeSuite={setPrestigeSuite}
                    setExclusiveRetreat={setExclusiveRetreat}
                    setDeluxAdult={setDeluxAdult}
                    setSuperDeluxAdult={setSuperDeluxAdult}
                    setSuiteAdult={setSuiteAdult}
                    setPremiumAdult={setPremiumAdult}
                    setPremiereRetreatAdult={setPremiereRetreatAdult}
                    setEliteSuiteAdult={setEliteSuiteAdult}
                    setGrandDeluxeAdult={setGrandDeluxeAdult}
                    setImperialSuiteAdult={setImperialSuiteAdult}
                    setSupremeRetreatAdult={setSupremeRetreatAdult}
                    setRoyalDeluxeAdult={setRoyalDeluxeAdult}
                    setPrestigeSuiteAdult={setPrestigeSuiteAdult}
                    setExclusiveRetreatAdult={setExclusiveRetreatAdult}
                    setisOpen={setisOpen}
                    BookingFinalize={BookingFinalize}
                    RoomCategoryCombination={RoomCategoryCombination}
                    setRoomCategoryCombination={setRoomCategoryCombination}
                    isPayatHotel={props.isPayatHotel}
                    tag={element.roomTag}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}

        {/* {Packages.length !== 0 && !islookingroom ? (
            <div>
              <div
                className="container mt-4"
                id="id_filters1"
                style={{ display: "block" }}
              >
                <div className="filters" style={{ backgroundColor: props.Bg_color }}>
                  <div className="crd-head w-100">
                    <h3 style={{ textAlign: "center" }}>
                      <strong>Select Packages</strong>
                    </h3>
                  </div>
                </div>
              </div>
              {Packages.map((element) => {
                return (
                  <div key={element.url}>
                    <Adpackage
                      addTax={props.addTax}
                      GatewayConnected={props.GatewayConnected}
                      baseUrl={props.baseUrl}
                      isPayatHotel={props.isPayatHotel}
                      isOnlinepay={props.isOnlinepay}
                      currency={props.currency}
                      packageId={element.packageId}
                      name={
                        element.packageName
                          ? element.packageName.slice(0, 80)
                          : ""
                      }
                      description={element.packageName ? element.packageName : ""}
                      packageInclusion={
                        element.packageInclusion ? element.packageInclusion : ""
                      }
                      packageItinerary={
                        element.packageItinerary ? element.packageItinerary : ""
                      }
                      packageguests={
                        element.packageguests ? element.packageguests : ""
                      }
                      NoofDays={element.NoofDays ? element.NoofDays : ""}
                      NoofNight={element.NoofNight ? element.NoofNight : ""}
                      price={element.packagePrice ? element.packagePrice : ""}
                      roomType={element.roomTypeProvided}
                      ratechange={ratesChange}
                      images={element.packageImage}
                      color={props.color}
                      FinalConfirmButton={props.FinalConfirmButton}
                      Paymentbutton={props.Paymentbutton}
                      Bg_color={props.Bg_color}
                      setPayment={props.setPayment}
                      HotelName={props.HotelName}
                      HotelLogo={props.HotelLogo}
                      RoomCategoryCombination={RoomCategoryCombination}
                      setRoomCategoryCombination={setRoomCategoryCombination}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )} */}

        <div className="container">
          {Delux !== 0 ||
          SuperDelux !== 0 ||
          Suite !== 0 ||
          Premium !== 0 ||
          PremiereRetreat !== 0 ||
          EliteSuite !== 0 ||
          GrandDeluxe !== 0 ||
          ImperialSuite !== 0 ||
          SupremeRetreat !== 0 ||
          RoyalDeluxe !== 0 ||
          PrestigeSuite !== 0 ||
          ExclusiveRetreat !== 0 ? (
            <button
              className="ReserveButtonForPayment"
              style={{ background: props.Bg_color }}
              onClick={BookingFinalize}
            >
              <strong>{props.FinalConfirmButton}</strong>
            </button>
          ) : (
            ""
          )}
        </div>

        {(Delux !== 0 ||
          SuperDelux !== 0 ||
          Suite !== 0 ||
          Premium !== 0 ||
          PremiereRetreat !== 0 ||
          EliteSuite !== 0 ||
          GrandDeluxe !== 0 ||
          ImperialSuite !== 0 ||
          SupremeRetreat !== 0 ||
          RoyalDeluxe !== 0 ||
          PrestigeSuite !== 0 ||
          ExclusiveRetreat !== 0) &&
        mealplan.length !== 0 ? (
          <Mealplan
            baseUrl={props.baseUrl}
            setisperRoom={setisperRoom}
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
            PremiereRetreat={PremiereRetreat}
            EliteSuite={EliteSuite}
            GrandDeluxe={GrandDeluxe}
            ImperialSuite={ImperialSuite}
            SupremeRetreat={SupremeRetreat}
            RoyalDeluxe={RoyalDeluxe}
            PrestigeSuite={PrestigeSuite}
            ExclusiveRetreat={ExclusiveRetreat}
            Adult={Adult}
            isperRoom={isperRoom}
            color={props.color}
            Bg_color={props.Bg_color}
          />
        ) : (
          ""
        )}

        {isOpen &&
        (Delux !== 0 ||
          SuperDelux !== 0 ||
          Suite !== 0 ||
          Premium !== 0 ||
          PremiereRetreat !== 0 ||
          EliteSuite !== 0 ||
          GrandDeluxe !== 0 ||
          ImperialSuite !== 0 ||
          SupremeRetreat !== 0 ||
          RoyalDeluxe !== 0 ||
          PrestigeSuite !== 0 ||
          ExclusiveRetreat !== 0) ? (
          <Contactinfo
            addTax={props.addTax}
            GatewayConnected={props.GatewayConnected}
            baseUrl={props.baseUrl}
            isPayatHotel={props.isPayatHotel}
            isOnlinepay={props.isOnlinepay}
            currency={props.currency}
            setIsOpen={1}
            Bg_color={props.Bg_color}
            setPayment={props.setPayment}
            HotelName={props.HotelName}
            HotelLogo={props.HotelLogo}
            BookingTax={1200}
            BookingTotalPrice={1200}
            BookingPrice={1200}
            Paymentbutton={props.Paymentbutton}
            nights={Night}
            room={1}
            isSemiPayment={props.isSemiPayment}
            color={props.color}
            price={1}
            grandtotal={1}
            type={props.roomtype}
            Delux={Delux}
            SuperDelux={SuperDelux}
            Suite={Suite}
            Premium={Premium}
            PremiereRetreat={PremiereRetreat}
            EliteSuite={EliteSuite}
            GrandDeluxe={GrandDeluxe}
            ImperialSuite={ImperialSuite}
            SupremeRetreat={SupremeRetreat}
            RoyalDeluxe={RoyalDeluxe}
            PrestigeSuite={PrestigeSuite}
            ExclusiveRetreat={ExclusiveRetreat}
            ratesChange={ratesChange}
            Adult={Adult}
            maxAdult={maxAdult}
            setmaxAdult={setmaxAdult}
            DeluxAdult={DeluxAdult}
            SuperDeluxAdult={SuperDeluxAdult}
            SuiteAdult={SuiteAdult}
            PremiumAdult={PremiumAdult}
            PremiereRetreatAdult={PremiereRetreatAdult}
            EliteSuiteAdult={EliteSuiteAdult}
            GrandDeluxeAdult={GrandDeluxeAdult}
            ImperialSuiteAdult={ImperialSuiteAdult}
            SupremeRetreatAdult={SupremeRetreatAdult}
            RoyalDeluxeAdult={RoyalDeluxeAdult}
            PrestigeSuiteAdult={PrestigeSuiteAdult}
            ExclusiveRetreatAdult={ExclusiveRetreatAdult}
            selectedMealPlan={selectedMealPlan}
            selectedMealPlanPrice={selectedMealPlanPrice}
            isperRoom={isperRoom}
            Mealprice={Mealprice}
            mealplanId={mealplanId}
            RoomCategoryCombination={RoomCategoryCombination}
            setRoomCategoryCombination={setRoomCategoryCombination}
          />
        ) : (
          ""
        )}
        {/* <div className={`${props.display}`}>
          <Enquiryform
            baseUrl={props.baseUrl}
            color={props.color}
            bg_color={props.Bg_color}
          />
        </div> */}

        {openAlert ? (
          <div className="alert alert-danger alertDiv" role="alert">
            Please Select More Rooms
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
