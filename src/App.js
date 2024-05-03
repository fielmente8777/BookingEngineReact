import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";
import SuccessPage from "./components/SuccessPage";
import "./components/i18n"; // Import your i18n configuration
import AuthContext from "./context/AuthProvider";
import "./style/Landing.css";
import "./style/NavFoot.css";

import Login from "./components/Login";
import { Register } from "./components/Register";
import Profile from "./components/Profile";
import Booking from "./components/Booking";


function App() {
  const { openLoginPopup, setOpenLoginPopup, openRegisterPopup, FetchUsersBookings,
    FetchUsersFutureBookings } = useContext(AuthContext)
  const [Bg_color, setBg_color] = useState("#153B5B"); //background for header and footer
  const [Box_color, setBox_color] = useState("#0A3A75"); //Box color for reservation
  const [Button_color, setButton_color] = useState("#0A3A75"); //Button color of checkin and out

  const [HotelEmail, setHotelEmail] = useState("test@gmail.com");
  const [HotelAbout, setHotelAbout] = useState("About Us");
  const [HotelAddress, setHotelAddress] = useState("Address");
  const [HotelNumber, setHotelNumber] = useState("Number");
  const [HotelName, setHotelName] = useState("Hotelname");
  const [HotelImage, setHotelImage] = useState(
    "https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077"
  );
  const [HotelLogo, setHotelLogo] = useState(
    "https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077"
  );
  const [HotelLocation, setHotelLocation] = useState("");

  const [Claritycode, setClarityCode] = useState("");
  const [isOnlinepay, setisOnlinepay] = useState(false);
  const [isPayatHotel, setisPayatHotel] = useState(false);
  const [isSemiPayment, setisSemiPayment] = useState(false);
  const [GatewayConnected, setGatewayConnected] = useState({
    Type: "Razorpay",
    API_KEY: "rzp_test_UZ0V9jh3jMC0C9",
    SECRET_KEY: "XHctZxmnMhzkkwcAlDtF0Xuc",
  });
  const [currency, setCurrency] = useState("INR");
  const [Facebook, setFacebook] = useState("https://facebook.com/");
  const [Instagram, setInstagram] = useState("https://instagram.com/");
  const [Twitter, setTwitter] = useState("https://twitter.com/");
  const [Tripadvisors, setTripadvisors] = useState("https://facebook.com/");
  const [Linkedin, setLinkedin] = useState("https://instagram.com/");
  const [Youtube, setYoutube] = useState("https://twitter.com/");

  const [Reservation_button, setReservation_button] = useState("Reservations");
  const [Room_searchButton, setRoom_searchButton] = useState("Look For Rooms");
  const [RoomFinal_searchButton, setRoomFinal_searchButton] =
    useState("Reserve");
  const [PaymentButton, setPaymentButton] = useState("Pay Now");

  const [Spinner_spin, setSpinner_spin] = useState("d-none");
  const [Spinner_spin1, setSpinner_spin1] = useState("d-none");
  const [Spinner_spin2, setSpinner_spin2] = useState("d-none");

  const [Privacypolicy, setPrivacypolicy] = useState("Privacy policy");
  const [Cancellation, setCancellation] = useState("Cancellation policy");
  const [Termsconditions, setTermsconditions] = useState(
    "Terms and conditions"
  );
  const [hotelwebsite, sethotelwebsite] = useState("");
  const [addTax, setaddTax] = useState(false);

  const [Payment, setPayment] = useState({
    Status: false,
    Logo: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1703548800&semt=sph",
    HotelName: "Peace at Peak",
    Payment: "2",
    Order: "3",
    Name: "4",
    Phone: "5",
    Email: "6",
    Country: "6",
    Checkin: "7",
    Checkout: "8",
    Adult: "8",
    Kid: "1",
    Tax: "2",
    Amount: "3",
    PayStatus: "Paid",
    Delux: "4",
    Sd: "4",
    Suite: "4",
    Premium: "4",
    PremiereRetreat: "1",
    EliteSuite: "0",
    GrandDeluxe: "0",
    ImperialSuite: "0",
    SupremeRetreat: "0",
    RoyalDeluxe: "0",
    PrestigeSuite: "0",
    ExclusiveRetreat: "0",
    MealPlan: "Meal",
    Mealprice: "200",
    PackagePlan: "Package",
    PackagePrice: "1200",
    Rooms: {
      DELUX: "a",
      SUPERDELUX: "a",
      SUITE: "a",
      PREMIUM: "a",
      PremiereRetreat: "a",
      EliteSuite: "a",
      GrandDeluxe: "a",
      ImperialSuite: "-",
      SupremeRetreat: "-",
      RoyalDeluxe: "-",
      PrestigeSuite: "-",
      ExclusiveRetreat: "-",
    },
  });
  async function Get_Hotel_status_exists() {
    const response = await fetch(
      `${baseUrl}/booking/getenginedetails/${localStorage.getItem(
        "hotelid"
      )}/${localStorage.getItem("hid")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    // const json = await response1.json();

    if (json.Status === true) {
      document.title = document.title.replace(
        "<!-- HOTELNAME -->",
        json.Details.HotelName
      );
      const faviconLink = document.querySelector('link[rel="icon"]');
      if (faviconLink) {
        faviconLink.href = json.Details.Footer.Logo;
      }
      setHotelLogo(json.Details.Footer.Logo);
      setHotelLocation(json.Details.Location);
      setHotelEmail(json.Details.Footer.Email);
      setHotelAbout(json.Details.AboutUs);
      setHotelAddress(json.Details.Footer.Address);
      setHotelNumber(json.Details.Footer.Phone);
      setHotelName(json.Details.HotelName);
      setHotelImage(json.Details.BgImage);
      sethotelwebsite(json.website);

      setFacebook(json.Details.Links.Facebook);
      setInstagram(json.Details.Links.Instagram);
      setTwitter(json.Details.Links.Twitter);
      setTripadvisors(json.Details.Links.Tripadvisors);
      setLinkedin(json.Details.Links.Linkedin);
      setYoutube(json.Details.Links.Youtube);

      setPrivacypolicy(json.Details.PrivacyPolicy);
      setCancellation(json.Details.CancellationPolicy);
      setTermsconditions(json.Details.TermsConditions);

      //colors
      setBg_color(json.Details.Colors.BackgroundColor);
      setBox_color(json.Details.Colors.BoardColor);
      setButton_color(json.Details.Colors.ButtonColor);

      //buttons
      setReservation_button(json.Details.Labels.ReserveBoard);
      setRoom_searchButton(json.Details.Labels.ReserveButton);
      setRoomFinal_searchButton(json.Details.Labels.ConfirmButton);
      setPaymentButton(json.Details.Labels.PayButton);

      //currency
      setCurrency(json.Profile.currency);
      //pay online option
      setisOnlinepay(json.Details.isOnlinePayment);
      //pay at hotel option
      setisPayatHotel(json.Details.isPayatHotel);
      //25% 
      setisSemiPayment(json.Details.isSemiPayment)
      //Gateway
      setGatewayConnected(json.Details.Gateway);
      //tax add
      setaddTax(json.Details.addTax);

      //Clarity code
      setClarityCode(json.Details.Clarity);
      const clarityScript = document.createElement("script");

      // Replace the placeholder with the actual backend code value
      const clarityScriptCode = `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${json.Details.Clarity}");
        `;

      clarityScript.innerHTML = clarityScriptCode;

      // Append the Clarity script element to the head of the document
      document.head.appendChild(clarityScript);

      setSpinner_spin1("");
    } else {
      setSpinner_spin2("");
    }
  }
  const [AuthenticatedUser, setAuthenticatedUser] = useState(false)
  const CheckLoginUserStatus = async () => {
    if (localStorage.getItem("engineAuth") == null) {
      setAuthenticatedUser(false)
    }
    else {
      const response = await fetch(
        `${baseUrl}/feature1/getuser/${localStorage.getItem("hotelid")}/${localStorage.getItem("hid")}/${localStorage.getItem("engineAuth")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json.Status) {
        setAuthenticatedUser(true)
        FetchUsersBookings()
        FetchUsersFutureBookings()
      }
      else {
        setAuthenticatedUser(false)
      }
      // const json = await response1.json();
    }
  }



  const baseUrl = "https://nexon.eazotel.com";
  // const baseUrl = "http://127.0.0.1:5000";
  // const baseUrl = "https://testnexon.eazotel.com"

  const urlParams = new URLSearchParams(window.location.search);
  const hotelid = urlParams.get("id");
  const hid = urlParams.get("hid");
  localStorage.setItem("hotelid", hotelid);
  localStorage.setItem("hid", hid);

  useEffect(() => {
    Get_Hotel_status_exists();
    CheckLoginUserStatus();
  }, []);

  const { t, i18n } = useTranslation();

  // Change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };



  return (
    <>
      <Navbar
        hotelname={HotelName}
        logo={HotelLogo}
        display={Spinner_spin1}
        color={Bg_color}
        HotelNumber={HotelNumber}
        email={HotelEmail}
        hotelwebsite={hotelwebsite}
        AuthenticatedUser={AuthenticatedUser}
        setAuthenticatedUser={setAuthenticatedUser}
      />

      <Routes>

        <Route path="/" element={

          <>
            {!Payment.Status ? (
              <LandingPage
                addTax={addTax}
                GatewayConnected={GatewayConnected}
                isPayatHotel={isPayatHotel}
                isOnlinepay={isOnlinepay}
                currency={currency}
                Bg_color={Bg_color}
                HotelName={HotelName}
                HotelLogo={HotelLogo}
                baseUrl={baseUrl}
                Bg_image={HotelImage}
                color={Box_color}
                display={Spinner_spin1}
                bt_color={Button_color}
                ReservationLabel={Reservation_button}
                ReservationButton={Room_searchButton}
                FinalConfirmButton={RoomFinal_searchButton}
                Paymentbutton={PaymentButton}
                setPayment={setPayment}
                isSemiPayment={isSemiPayment}
              />
            ) : (
              <SuccessPage Payment={Payment} currency={currency} />
            )}


            <NotFoundPage display={Spinner_spin2} />

          </>

        } />





        <Route path='/profile' element={<Profile />} />
        <Route path="/booking" element={<Booking />} />


      </Routes>


      {openLoginPopup ? <Login setAuthenticatedUser={setAuthenticatedUser} baseUrl={baseUrl} bt_color={Button_color} /> : ""}

      {openRegisterPopup ? <Register baseUrl={baseUrl} bt_color={Button_color} setAuthenticatedUser={setAuthenticatedUser} /> : ""}


      <Footer
        hotelwebsite={hotelwebsite}
        AuthenticatedUser={AuthenticatedUser}
        color={Bg_color}
        Logo={HotelLogo}
        HotelAddress={HotelAddress}
        HotelNumber={HotelNumber}
        aboutus={HotelAbout}
        display={Spinner_spin1}
        email={HotelEmail}
        facebook={Facebook}
        instagram={Instagram}
        twitter={Twitter}
        Tripadvisors={Tripadvisors}
        Linkedin={Linkedin}
        Youtube={Youtube}
        Location={HotelLocation}
        Privacypolicy={Privacypolicy}
        Cancellation={Cancellation}
        Termsconditions={Termsconditions}
        baseUrl={baseUrl}
      />

    </>
  );
}

export default App;
