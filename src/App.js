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


function App() {
  const [Bg_color, setBg_color] = useState("orange")      //background for header and footer
  const [Box_color, setBox_color] = useState("green")     //Box color for reservation
  const [Button_color, setButton_color] = useState("blue")//Button color of checkin and out
  const [HotelEmail, setHotelEmail] = useState("test@gmail.com")
  const [HotelAbout, setHotelAbout] = useState("About Us")
  const [HotelName, setHotelName] = useState("Hotelname")
  const [HotelImage, setHotelImage] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [HotelLogo, setHotelLogo] = useState("https://images-platform.99static.com//G6t6CKODhWtwJt03cAKyRsMuv5U=/654x0:1299x645/fit-in/590x590/99designs-contests-attachments/115/115901/attachment_115901077")
  const [Facebook, setFacebook] = useState("https://facebook.com/") 
  const [Instagram, setInstagram] = useState("https://instagram.com/") 
  const [Twitter, setTwitter] = useState("https://twitter.com/") 


  const [Reservation_button, setReservation_button] = useState("Reservations") ;
  const [Room_searchButton, setRoom_searchButton] = useState("Look For Rooms");
  const [RoomFinal_searchButton, setRoomFinal_searchButton] = useState("Reserve");
  const [PaymentButton,setPaymentButton] = useState("Submit")
  const [Spinner_spin,setSpinner_spin] = useState("")
  const [Spinner_spin1,setSpinner_spin1] = useState("d-none")
  const [Spinner_spin2,setSpinner_spin2] = useState("d-none")
  
  async function Get_Hotel_status_exists() {
      //spinner start

        const response = await fetch("https://booking.eazotel.com/fielmente/booking/identity/?id="+localStorage.getItem("id"), {
          method: "GET", 
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
          
        });

        const json = await response.json();
        // const json1 = await response1.json();

        if (json.Status === true ) {
              const response1 = await fetch("https://booking.eazotel.com/fielmente/booking/information", {
                method: "POST", 
                headers: {
                  Accept: "application/json, text/plain, /",
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({
                  "Hotel_id_hash":localStorage.getItem("id")
                }),
              });
              const json1 = await response1.json();
              setHotelName(json1.Navbar["HotelName"])
              setHotelImage(json1.Navbar["Hotel_Image"])
              setHotelLogo(json1.Navbar["Hotel_Logo"])
              setHotelEmail(json1.Navbar["HotelEmail"])

              //Footer Information
              setHotelAbout(json1.Footer["Aboutus"])
              setBg_color(json1.Footer["Bg_color"])
              setBox_color(json1.Footer["box_color"])
              setButton_color(json1.Footer["Button_color"])
              setFacebook(json1.Footer["Facebook"])
              setInstagram(json1.Footer["Instagram"])
              setTwitter(json1.Footer["Twitter"])

              //Buttons Labels
              setReservation_button(json1.Label["Reservation_box"]);
              setRoom_searchButton(json1.Label["Room_search_button"])
              setRoomFinal_searchButton(json1.Label["Reserve_button"])
              setPaymentButton(json1.Label["Guest_Info_submit"])
              //spinner end

              setSpinner_spin("d-none")
              setSpinner_spin1("")
        
        } else {
          //spinner end
          setSpinner_spin("d-none")
          setSpinner_spin2("")

        }
      }
    

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("id");
  localStorage.setItem('id', token)
  Get_Hotel_status_exists()

  return (
    <>

      <Spinner  display={Spinner_spin} /> 

      <Navbar hotelname={HotelName} logo={HotelLogo} display={Spinner_spin1} color={Bg_color} />

      <LandingPage Bg_image={HotelImage} color={Box_color} display={Spinner_spin1} bt_color={Button_color} ReservationLabel={Reservation_button} ReservationButton={Room_searchButton} FinalConfirmButton={RoomFinal_searchButton} Paymentbutton={PaymentButton} />

      <Footer color={Bg_color} aboutus={HotelAbout} display={Spinner_spin1} email={HotelEmail} facebook={Facebook} instagram={Instagram} twitter={Twitter} />
      
      <NotFoundPage display={Spinner_spin2} />
    </>
  );
}

export default App;
