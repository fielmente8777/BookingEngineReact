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
import SuccessPage from './components/SuccessPage';



function App() {
  const [Bg_color, setBg_color] = useState("#153B5B")        //background for header and footer
  const [Box_color, setBox_color] = useState("#0A3A75")       //Box color for reservation
  const [Button_color, setButton_color] = useState("#0A3A75")  //Button color of checkin and out

  const [HotelEmail, setHotelEmail] = useState("test@gmail.com")
  const [HotelAbout, setHotelAbout] = useState("About Us")
  const [HotelAddress, setHotelAddress] = useState("Address")
  const [HotelNumber, setHotelNumber] = useState("Number")
  const [HotelName, setHotelName] = useState("Hotelname")
  const [HotelImage, setHotelImage] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [HotelLogo, setHotelLogo] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [HotelLocation, setHotelLocation] = useState("")


  const [Facebook, setFacebook] = useState("https://facebook.com/")
  const [Instagram, setInstagram] = useState("https://instagram.com/")
  const [Twitter, setTwitter] = useState("https://twitter.com/")
  const [Tripadvisors, setTripadvisors] = useState("https://facebook.com/")
  const [Linkedin, setLinkedin] = useState("https://instagram.com/")
  const [Youtube, setYoutube] = useState("https://twitter.com/")


  const [Reservation_button, setReservation_button] = useState("Reservations");
  const [Room_searchButton, setRoom_searchButton] = useState("Look For Rooms");
  const [RoomFinal_searchButton, setRoomFinal_searchButton] = useState("Reserve");
  const [PaymentButton, setPaymentButton] = useState("Pay Now")


  const [Spinner_spin, setSpinner_spin] = useState("d-none")
  const [Spinner_spin1, setSpinner_spin1] = useState("d-none")
  const [Spinner_spin2, setSpinner_spin2] = useState("d-none")

  const [Privacypolicy, setPrivacypolicy] = useState("Privacy policy")
  const [Cancellation, setCancellation] = useState("Cancellation policy")
  const [Termsconditions, setTermsconditions] = useState("Terms and conditions")
  const [hotelwebsite, sethotelwebsite] = useState("")

  const [Payment, setPayment] = useState({
    "Status": false,
    "Payment": "2",
    "Order": "3",
    "Name": "4",
    "Phone": "5",
    "Email": "6",
    "Country": "6",
    "Checkin": "7",
    "Checkout": "8",
    "Adult": "8",
    "Kid": "1",
    "Tax": "2",
    "Amount": "3",
    "PayStatus": "Paid",
    "Delux":"4",
    "Sd":"4",
    "Suite":"4",
    "Premium":"4",
    "MealPlan":"Meal",
    "Mealprice":"200"

  })
  async function Get_Hotel_status_exists() {
    const response = await fetch(`${baseUrl}/booking/getenginedetails/${localStorage.getItem("hotelid")}`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json"
      },

    });

    const json = await response.json();
    // const json = await response1.json();

    if (json.Status === true) {
      document.title = document.title.replace("<!-- HOTELNAME -->", json.Details.HotelName);
      const faviconLink = document.querySelector('link[rel="icon"]');
      if (faviconLink) {
        faviconLink.href = json.Details.Footer.Logo;
      }
      setHotelLogo(json.Details.Footer.Logo)
      setHotelLocation(json.Details.Location)
      setHotelEmail(json.Details.Footer.Email)
      setHotelAbout(json.Details.AboutUs)
      setHotelAddress(json.Details.Footer.Address)
      setHotelNumber(json.Details.Footer.Phone)
      setHotelName(json.Details.HotelName)
      setHotelImage(json.Details.BgImage)
      sethotelwebsite(json.website)



      setFacebook(json.Details.Links.Facebook)
      setInstagram(json.Details.Links.Instagram)
      setTwitter(json.Details.Links.Twitter)
      setTripadvisors(json.Details.Links.Tripadvisors)
      setLinkedin(json.Details.Links.Linkedin)
      setYoutube(json.Details.Links.Youtube)


      setPrivacypolicy(json.Details.PrivacyPolicy)
      setCancellation(json.Details.CancellationPolicy)
      setTermsconditions(json.Details.TermsConditions)

      //colors
      setBg_color(json.Details.Colors.BackgroundColor)
      setBox_color(json.Details.Colors.BoardColor)
      setButton_color(json.Details.Colors.ButtonColor)

      //buttons
      setReservation_button(json.Details.Labels.ReserveBoard)
      setRoom_searchButton(json.Details.Labels.ReserveButton)
      setRoomFinal_searchButton(json.Details.Labels.ConfirmButton)
      setPaymentButton(json.Details.Labels.PayButton)

      setSpinner_spin1('')
    } else {
      setSpinner_spin2('')

    }
  }

  const baseUrl = "https://nexon.eazotel.com"
  // const baseUrl = "http://127.0.0.1:5000"
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

        <Navbar hotelname={HotelName} logo={HotelLogo} display={Spinner_spin1} color={Bg_color} HotelNumber={HotelNumber}
          email={HotelEmail} hotelwebsite={hotelwebsite} />

        {!Payment.Status ? <LandingPage Bg_color={Bg_color} HotelName={HotelName} HotelLogo={HotelLogo} baseUrl={baseUrl}
          Bg_image={HotelImage} color={Box_color} display={Spinner_spin1} bt_color={Button_color}
          ReservationLabel={Reservation_button} ReservationButton={Room_searchButton}
          FinalConfirmButton={RoomFinal_searchButton} Paymentbutton={PaymentButton} setPayment={setPayment} />
          : <SuccessPage Payment={Payment} />}

        <Footer hotelwebsite={hotelwebsite} color={Bg_color} Logo={HotelLogo} HotelAddress={HotelAddress} HotelNumber={HotelNumber}
          aboutus={HotelAbout} display={Spinner_spin1} email={HotelEmail} facebook={Facebook}
          instagram={Instagram} twitter={Twitter} Tripadvisors={Tripadvisors}
          Linkedin={Linkedin}
          Youtube={Youtube} Location={HotelLocation}
          Privacypolicy={Privacypolicy} Cancellation={Cancellation} Termsconditions={Termsconditions} />

        <NotFoundPage display={Spinner_spin2} />
      </BrowserRouter>

    </>
  );
}

export default App;
