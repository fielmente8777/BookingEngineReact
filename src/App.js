import './App.css';
import './style/NavFoot.css'
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import FullCalendar from './components/FullCalendar';
import { useState } from 'react';
import Spinner from './components/Spinner';
import NotFoundPage from './components/NotFoundPage';
import { BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import './components/i18n'; // Import your i18n configuration



function App() {
  const [Bg_color, setBg_color] = useState("#0A3A75")        //background for header and footer
  const [Box_color, setBox_color] = useState("#0A3A75")       //Box color for reservation
  const [Button_color, setButton_color] = useState("#0A3A75")  //Button color of checkin and out
  const [HotelEmail, setHotelEmail] = useState("test@gmail.com")
  const [HotelAbout, setHotelAbout] = useState("About Us")
  const [HotelName, setHotelName] = useState("Hotelname")
  const [HotelImage, setHotelImage] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [HotelLogo, setHotelLogo] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [Facebook, setFacebook] = useState("https://facebook.com/")
  const [Instagram, setInstagram] = useState("https://instagram.com/")
  const [Twitter, setTwitter] = useState("https://twitter.com/")


  const [Reservation_button, setReservation_button] = useState("Reservations");
  const [Room_searchButton, setRoom_searchButton] = useState("Look For Rooms");
  const [RoomFinal_searchButton, setRoomFinal_searchButton] = useState("Reserve");
  const [PaymentButton, setPaymentButton] = useState("Submit")


  const [Spinner_spin, setSpinner_spin] = useState("d-none")
  const [Spinner_spin1, setSpinner_spin1] = useState("")
  const [Spinner_spin2, setSpinner_spin2] = useState("")

  // async function Get_Hotel_status_exists() {
  //     //spinner start

  //       const response = await fetch("http://127.0.0.1:8000/api/bookingEngine/engineDetails?id="+localStorage.getItem("id"), {
  //         method: "GET", 
  //         headers: {
  //           Accept: "application/json, text/plain, /",
  //           "Content-Type": "application/json",
  //         },

  //       });

  //       const json = await response.json();
  //       // const json = await response1.json();

  //       if (json.Status === true ) {
  //             setHotelName(json.Profile["hotelName"])
  //             setHotelEmail(json.Profile["hotelEmail"])

  //             //Footer Information
  //             setHotelAbout(json.Data["AboutUs"])
  //             setBg_color(json.Data.Colors["BackgroundColor"])
  //             setBox_color(json.Data.Colors["BoardColor"])
  //             setButton_color(json.Data.Colors["ButtonColor"])

  //             //Buttons Labels
  //             setReservation_button(json.Data.Labels["ReserveBoard"]);
  //             setRoom_searchButton(json.Data.Labels["ReserveButton"])
  //             setRoomFinal_searchButton(json.Data.Labels["ConfirmButton"])
  //             setPaymentButton(json.Data.Labels["PayButton"])

  //             //Image
  //             setHotelLogo(json.WebsiteData["Footer"]["Logo"])
  //             setFacebook(json.WebsiteData["Links"].Facebook)
  //             setInstagram(json.WebsiteData["Links"].Instagram)
  //             setTwitter(json.WebsiteData["Links"].Twitter)
  //             //spinner end

  //             setSpinner_spin("d-none")
  //             setSpinner_spin1("")

  //       } else {
  //         //spinner end
  //         setSpinner_spin("d-none")
  //         setSpinner_spin2("")

  //       }
  //     }


  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("id");
  localStorage.setItem('id', token)
  // Get_Hotel_status_exists()

  const { t, i18n } = useTranslation();

  // Change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };





  return (
    <>
      <BrowserRouter>
        <Spinner display={Spinner_spin} />


        <Navbar hotelname={HotelName} logo={HotelLogo} display={Spinner_spin1} color={Bg_color} />
        <LandingPage Bg_image={HotelImage} color={Box_color} display={Spinner_spin1} bt_color={Button_color} ReservationLabel={Reservation_button} ReservationButton={Room_searchButton} FinalConfirmButton={RoomFinal_searchButton} Paymentbutton={PaymentButton} />

        <Footer color={Bg_color} aboutus={HotelAbout} display={Spinner_spin1} email={HotelEmail} facebook={Facebook} instagram={Instagram} twitter={Twitter} />

        <NotFoundPage display={Spinner_spin2} />
      </BrowserRouter>
    </>
  );
}

export default App;
