// import React from 'react'
import React, { useState } from 'react';
import Cards from './Cards';
import FullCalendar from './FullCalendar';
import FullCalendar1 from './FullCalendar1';
import Spinner from './Spinner';

export default function Landing(props) {
    let [Headlines, setHeadlines] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    async function Get_Hotel_status_exists() {
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

        } else {
          alert("404 page")
        }
      }




    async function toggleDiv(){
        let checkin_date = localStorage.getItem("Checkin")
        let checkout_date = localStorage.getItem("Checkout")
        let adult = document.getElementById("adult").value;
        let kid = document.getElementById("kid").value;
        localStorage.setItem("Adult",adult);
        localStorage.setItem("Kid",kid);

        const response = await fetch("https://booking.eazotel.com/fielmente/booking/search/", {
          method: "POST", 
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Hotel_id_hash":localStorage.getItem("id"),
            "Checkin_date":checkin_date,
            "Checkout_date":checkout_date,
            "Adult":localStorage.getItem("Adult"),
            "Kid":localStorage.getItem("Kid")
        }), 
        });

        const json = await response.json();

        if (json.Status === true ) {
            document.getElementById("No_rooms").style.display="none"
            setHeadlines((json.Rooms));
            
        } else {
            document.getElementById("No_rooms").style.display="block"
        }
        



        setIsOpen(!isOpen);
    };


   

    return (
        <>
            <section classNameName={`section`}>
                {/* style={{width:"100%",objectFit:"cover",backgroundImage:`url(${props.Bg_image})`,backgroundRepeat:"no-repeat" }} */}
                <div className={`container form-main ${props.display}`} >
                    <div className="form">
                        <div className="reservation" style={{background:props.color}}>
                            <h4 >{props.ReservationLabel}</h4>
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
                                        <label style={{fontWeight:"bold"}}>Check In</label>
                                        <label style={{fontWeight:"bold"}}>Check Out</label>
                                    </div>

                                    <div className="calendarDiv">
                                        <FullCalendar bg_color={props.bt_color}/>
                                        <FullCalendar1 bg_color={props.bt_color}/>
                                    </div>
                                </div>
                            </div>



                            <div className="fill_detail">
                                <div className="members">

                                    <div className="members_inner">
                                        <div className="details">
                                            <label for="#">Adult(s)</label>

                                            <select name="#" id="adult" className="options" style={{background:props.bt_color}}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>

                                        <div className="details d-flex s-det">
                                            <div className="child-gap d-flex flex-column align-items-center">
                                                <label for="#">Children</label>
                                                <label for="#" className="upto">(up to 12 years)</label>
                                                

                                                <select name="#" className="options" id="kid" onchange="showDropdown()" style={{background:props.bt_color}}>
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
                        <div className="submit active">
                            {/* <!-- <input onclick="logPostData()" type="button">Look for Beds! onclick="logPostData()" --> */}
                            {/* <input onclick="logPostData()" type="button" value="Look for Beds!" /> */}
                            {/* <input onClick={toggleContent()} type="button" value="Look for Beds!" /> */}
                            <button onClick={toggleDiv} style={{background:props.color}}>{props.ReservationButton}</button>

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
            <div className='' id="No_rooms" style={{textAlign: "center",color: "grey",display:"none"}}>
                <h3>No rooms Available</h3>
            </div>
            {Headlines.map((element)=>{
                return <div key={element.url}>
                    <Cards 
                    name = {element.Room?element.Room.slice(0,80):""}
                    description={element.Description?element.Description.slice(0,80):""}
                    available = {element.Available}
                    price={element.Price?element.Price:""}
                    beds = {element.Beds?element.Beds:""}
                    facilities = {element.Facilities}
                    images = {element.Images}
                    color = {props.color}
                    FinalConfirmButton = {props.FinalConfirmButton}
                    Paymentbutton = {props.Paymentbutton}
                    />
                
            </div>
            })}
            
        </>
    )
}
