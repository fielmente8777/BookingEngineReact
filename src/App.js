import './App.css';
import './style/NavFoot.css'
import './style/Landing.css'
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
  const [HotelAddress , setHotelAddress] = useState("Address")
  const [HotelNumber , setHotelNumber] = useState("Number")
  const [HotelName, setHotelName] = useState("Hotelname")
  const [HotelImage, setHotelImage] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [HotelLogo, setHotelLogo] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [HotelLocation,setHotelLocation] = useState("")
  
  
  const [Facebook, setFacebook] = useState("https://facebook.com/")
  const [Instagram, setInstagram] = useState("https://instagram.com/")
  const [Twitter, setTwitter] = useState("https://twitter.com/")


  const [Reservation_button, setReservation_button] = useState("Reservations");
  const [Room_searchButton, setRoom_searchButton] = useState("Look For Rooms");
  const [RoomFinal_searchButton, setRoomFinal_searchButton] = useState("Reserve");
  const [PaymentButton, setPaymentButton] = useState("Submit")


  const [Spinner_spin, setSpinner_spin] = useState("d-none")
  const [Spinner_spin1, setSpinner_spin1] = useState("d-none")
  const [Spinner_spin2, setSpinner_spin2] = useState("d-none")

  async function Get_Hotel_status_exists() {
    const response = await fetch(`${baseUrl}/api/engine/get?id=${localStorage.getItem("hotelid")}`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },

    });

    const json = await response.json();
    // const json = await response1.json();

    if (json.Status === true) {
      setHotelLogo(json.Details.Footer.Logo)
      setHotelLocation(json.Details.Location)
      setHotelEmail(json.Details.Footer.Email)
      setHotelAbout(json.Details.Footer.AboutText)
      setHotelAddress(json.Details.Footer.Address)
      setHotelNumber(json.Details.Footer.Phone)
      setHotelName(json.Details.HotelName)
      setFacebook(json.Details.Links.Facebook)
      setInstagram(json.Details.Links.Instagram)
      setTwitter(json.Details.Links.Twitter)

      setSpinner_spin1('')
    } else {
      setSpinner_spin2('')

    }
  }

  const baseUrl = "http://127.0.0.1:8000"
  const urlParams = new URLSearchParams(window.location.search);
  const hotelid = urlParams.get("id");
  localStorage.setItem('hotelid', hotelid)
  Get_Hotel_status_exists()

  const { t, i18n } = useTranslation();

  // Change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };





  return (
    <>
      <BrowserRouter>

        <Navbar hotelname={HotelName} logo={HotelLogo} display={Spinner_spin1} color={Bg_color} />

        <LandingPage baseUrl={baseUrl} Bg_image={HotelImage} color={Box_color} display={Spinner_spin1} bt_color={Button_color} ReservationLabel={Reservation_button} ReservationButton={Room_searchButton} FinalConfirmButton={RoomFinal_searchButton} Paymentbutton={PaymentButton} />

        <Footer color={Bg_color} Logo={HotelLogo} HotelAddress={HotelAddress} HotelNumber={HotelNumber} 
                aboutus={HotelAbout} display={Spinner_spin1} email={HotelEmail} facebook={Facebook} 
                instagram={Instagram} twitter={Twitter} Location={HotelLocation} />

        <NotFoundPage display={Spinner_spin2} />
      </BrowserRouter>

    </>
  );
}

export default App;
