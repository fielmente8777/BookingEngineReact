// import React from 'react';
import React, { useState } from 'react';
import Contactinfo from '../components/Contactinfo';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



export default function Cards(props) {
    const baseURL = "https://nexon.eazotel.com"
    const [BookingTax, setBookingTax] = useState(0)
    const [BookingTotalPrice, setBookingTotalPrice] = useState(0)
    const [BookingPrice, setBookingPrice] = useState(0)

    const [Original_Price, setOriginal_Price] = useState(props.price)
    const [Price, setPrice] = useState(props.price)
    const [Nights, setNights] = useState(0)
    const [Rooms, setRooms] = useState(0);
    const [Grandtotal, setGrandtotal] = useState(0)
    let Available_rooms = props.available;

    const [isOpen, setIsOpen] = useState(false);
    let Features = props.facilities;
    let images = props.images;
    // console.log(images)

    if (props.roomtype === "1") { props.setDeluxAdult(props.Adult) }
    if (props.roomtype === "2") { props.setSuperDeluxAdult(props.Adult) }
    if (props.roomtype === "3") { props.setSuiteAdult(props.Adult) }
    if (props.roomtype === "4") { props.setPremiumAdult(props.Adult) }


    const DelCount = (id) => {
        setIsOpen(false)
        let number = Number(document.getElementById(id).innerHTML);
        if (number > 0) {
            number -= 1;
            if (id === "DELUX") {
                props.setDelux(number)
            }
            if (id === "SUPER DELUX") {
                props.setSuperDelux(number)
            }
            if (id === "SUITE") {
                props.setSuite(number)
            }
            if (id === "PREMIUM") {
                props.setPremium(number)
            }
            let price = number * Number(Original_Price)
            setPrice(price)
            setRooms(number)
        }
        props.setisOpen(false)
    }

    const AddCount = (id) => {
        setIsOpen(false)
        let number = Number(document.getElementById(id).innerHTML);
        if (number < Available_rooms) {
            number += 1;
            if (id === "DELUX") {
                props.setDelux(number)
            }
            if (id === "SUPER DELUX") {
                props.setSuperDelux(number)
            }
            if (id === "SUITE") {
                props.setSuite(number)
            }
            if (id === "PREMIUM") {
                props.setPremium(number)
            }
            let price = number * Number(Original_Price)
            setPrice(price)
            setRooms(number)
        }

    }


    const toggleDiv = async () => {
        var date1 = new Date(localStorage.getItem("Checkin"));
        var date2 = new Date(localStorage.getItem("Checkout"));
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        setNights(Difference_In_Days);
        //Price API
        const FetchPrice = async () => {
            const response = await fetch(`${baseURL}/booking/total/${localStorage.getItem('hotelid')}`, {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, /",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "checkIn": localStorage.getItem("Checkin"),
                    "checkOut": localStorage.getItem("Checkout"),
                    "roomType": props.roomtype
                })
            })
            const json = await response.json();
            setBookingPrice(json.Price)
            setBookingTax(json.Tax)
            setBookingTotalPrice(json.TotalPrice)
        }
        FetchPrice()
        setIsOpen(!isOpen);
    };


    return (
        <>
            <div className="container"  >

                {/* filters start   */}

                {/* filters end  */}
                <div className="card_details" style={{ background: '#fff' }}>
                    <div className="card_inner">
                        {/* <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                {images.map((element) => {
                                    return <div class="carousel-item active">
                                        <img src={element} class="d-block w-100" alt="..." />
                                    </div>
                                }
                                )}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div> */}



                        {/* <Carousel fade>
                            <Carousel.Item>
                                {images.map((element) => {
                                    return <div class="carousel-item active">
                                        <img src={element} class="d-block w-100" alt="..." />
                                    </div>
                                }
                                )}
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                        </Carousel> */}


                        <Carousel>
                            {images.map((element) => {

                                return <Carousel.Item>

                                    <div class="carousel-item active">
                                        <img src={element} class="d-block w-100" alt="..." />
                                    </div>

                                </Carousel.Item>
                            }

                            )}
                        </Carousel>




                        <div className="main_description">
                            <div className="room-last d-flex justify-content-between ">
                                <div className="room-name">
                                    <h3 style={{ fontWeight: '600' }}>{props.name}</h3>
                                    {/* <span className="dec-sqr">{props.type}</span> */}
                                </div>
                                <div className="last-rooms">
                                    <p className="dec-lst">*Last {props.available} Rooms available<i
                                        className="fa-sharp fa-solid fa-circle-exclamation"></i></p>
                                </div>

                            </div>
                            <div className="description">
                                <p>{props.description}</p>
                            </div>
                            <div className="aminities-block">
                                <div className="aminities w-100">
                                    <div className="card_inr_icon">
                                        <i class="fa-solid fa-user"></i>X {props.Adult}
                                    </div>

                                    {/* <h5>Amenities</h5>
                                    <div className="land-aminit">

                                        <ul>
                                            {props.facilities.wifi ? <li><i className='fa fa-wifi'></i> Wi-fi</li> : ""}
                                            {props.facilities.television ? <li><i className='fa-solid fa-tv'></i> Television</li> : ""}
                                            {props.facilities.airConditonar ? <li><i className='fa fa-coffee'></i> Air Conditioner</li> : ""}
                                            {props.facilities.hairdryers ? <li><i className='fas fa-baby'></i> Hairdryers</li> : ""}
                                            {props.facilities.coffeeMakers ? <li><i className='fa fa-coffee'></i> Coffee Makers</li> : ""}
                                            {props.facilities.directDial ? <li><i className='fa fa-phone'></i> Direct Calling</li> : ""}
                                            {props.facilities.tableWithChair ? <li><i className='fas fa-book-open'></i> Study Table</li> : ""}
                                            {props.facilities.alarmclock ? <li><i className='fa fa-clock-o'></i> Alarm Clock</li> : ""}
                                            {props.facilities.fridge ? <li><i className='fas fa-bath'></i> Small Fridge</li> : ""}
                                            {props.facilities.bathroomWithShower ? <li><i className='fas fa-bath'></i> Amazing Shower</li> : ""}
                                            {props.facilities.electronicLocker ? <li><i className='fa fa-lock'></i> Security Locker</li> : ""}
                                            {props.facilities.freeBreakfast ? <li><i className='fa-solid fa-mug-saucer'></i> Free Breakfast </li> : ""}
                                            {props.facilities.kidEquipment ? <li><i className='fas fa-baby'></i> Kids Toys</li> : ""}
                                        </ul>
                                    </div> */}

                                </div>
                                <div className="room_price w-30">
                                    {/* <label>From</label>  */}
                                    {Rooms*(props.ratechange[props.roomtype].Price)!==0?<h4 style={{fontWeight:'600'}}><span id="total_price" style={{ fontSize: "22px" }}> {Rooms*(props.ratechange[props.roomtype].Price)}/- </span> INR</h4>:<h4 style={{fontWeight:'600'}}><span id="total_price" style={{ fontSize: "22px" }}> {(props.ratechange[props.roomtype].Price)}/- </span> INR</h4>}
                                    <span>Per Night</span>

                                    {/* <span style="color:red" className="span m-1">Last {{ Available }} Rooms</span>  */}
                                    <div className="no-rooms d-flex">
                                        <span>Room(s)</span>
                                        {Available_rooms!==0?
                                        <div className="room">
                                            <button className="btn-minus" onClick={() => { DelCount(props.type) }}>-</button>
                                            <button className="btn-total"
                                                id={`${props.type}`}>{Rooms}</button>
                                            <button className="btn-plus" onClick={() => { AddCount(props.type) }}>+</button>
                                        </div>:
                                        <div className='soldBtn'>
                                            <span class="badge text-bg-danger">SOLD OUT</span>
                                        </div>}
                                    </div>

                                    <div className="reser">
                                        {/* <p>Adults Allowed: {props.Adult}</p> */}

                                        {/* <button className="reserve_btn d-none" id="reserve_button" onclick="Redirect_Book()">RESERVE</button> */}
                                        {/* {Rooms!==0?<button className="reserve_btn" id="reserve_button" style={{ backgroundColor: props.color }} onClick={toggleDiv}>{props.FinalConfirmButton}</button>:""} */}
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                    <div className='card_tab'>
                        <Tabs
                            defaultActiveKey="amenities"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="amenities" title="Amenities">
                                <div className="aminities-block">
                                    <div className="aminities w-100">
                                        {/* <h5>Amenities</h5> */}
                                        <div className="land-aminit">

                                            <ul>
                                                {props.facilities.wifi ? <li><i className='fa fa-wifi'></i> Wi-fi</li> : ""}
                                                {props.facilities.television ? <li><i className='fa-solid fa-tv'></i> Television</li> : ""}
                                                {props.facilities.airConditonar ? <li><i className='fa fa-coffee'></i> Air Conditioner</li> : ""}
                                                {props.facilities.hairdryers ? <li><i className='fas fa-baby'></i> Hairdryers</li> : ""}
                                                {props.facilities.coffeeMakers ? <li><i className='fa fa-coffee'></i> Coffee Makers</li> : ""}
                                                {props.facilities.directDial ? <li><i className='fa fa-phone'></i> Direct Calling</li> : ""}
                                                {props.facilities.tableWithChair ? <li><i className='fas fa-book-open'></i> Study Table</li> : ""}
                                                {props.facilities.alarmclock ? <li><i className='fa fa-clock-o'></i> Alarm Clock</li> : ""}
                                                {props.facilities.fridge ? <li><i className='fas fa-bath'></i> Small Fridge</li> : ""}
                                                {props.facilities.bathroomWithShower ? <li><i className='fas fa-bath'></i> Amazing Shower</li> : ""}
                                                {props.facilities.electronicLocker ? <li><i className='fa fa-lock'></i> Security Locker</li> : ""}
                                                {props.facilities.freeBreakfast ? <li><i className='fa-solid fa-mug-saucer'></i> Free Breakfast </li> : ""}
                                                {props.facilities.kidEquipment ? <li><i className='fas fa-baby'></i> Kids Toys</li> : ""}
                                            </ul>
                                        </div>

                                    </div>
                                    {/* <div className="room_price w-30">
                                    <h4 style={{ fontWeight: '600' }}><span id="total_price" style={{ fontSize: "22px" }}> {props.ratechange[props.roomtype].Price}/- </span> INR</h4>
                                    <span>Per Night</span>

                                    <div className="no-rooms d-flex">
                                        <span>Room(s)</span>
                                        {Available_rooms != 0 ?
                                            <div className="room">
                                                <button className="btn-minus" onClick={() => { DelCount(props.type) }}>-</button>
                                                <button className="btn-total"
                                                    id={`${props.type}`}>{Rooms}</button>
                                                <button className="btn-plus" onClick={() => { AddCount(props.type) }}>+</button>
                                            </div> :
                                            <div className='soldBtn'>
                                                <span class="badge text-bg-danger">SOLD OUT</span>
                                            </div>}
                                    </div>

                                    <div className="reser">
                                        <p>Adults Allowed: {props.Adult}</p>
                                    </div>
                                </div> */}
                                </div>
                            </Tab>
                            <Tab eventKey="gallery" title="Gallery" style={{ color: 'black' }}>

                                <div className='room_card_img'>

                                    {images.map((element) => {

                                        return <img src={element} alt="" />
                                    }

                                    )}






                                    {/* <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?cs=srgb&dl=pexels-pixabay-164595.jpg&fm=jpg" alt="" />
                                    <img src="https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa-770x433.jpg?impolicy=website&width=770&height=431" alt="" />
                                    <img src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww&w=1000&q=80" alt="" />
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/a1/9c/80/essentia-luxury-hotel.jpg?w=700&h=-1&s=1" alt="" />
                                    <img src="https://images.bubbleup.com/width1920/quality35/mville2017/1-brand/1-margaritaville.com/gallery-media/220803-compasshotel-medford-pool-73868-1677873697.jpg" alt="" />
                                    <img src="https://assets.graydientcreative.com/files/outlets/platinum/images/marquis-3-min.jpg" alt="" /> */}


                                </div>
                                {/* {images.map((element) => {

                                return <Carousel.Item>

                                    <div class="carousel-item active">
                                        <img src={element} class="d-block w-100" alt="..." />
                                    </div>

                                </Carousel.Item>
                            }

                            )} */}
                            </Tab>
                            {/* <Tab eventKey="longer-tab" title="Loooonger Tab">
                            Tab content for Loooonger Tab
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            Tab content for Contact
                        </Tab> */}
                        </Tabs>

                    </div>
                </div>

            </div>

            {/* Contact informtion start  */}

            {isOpen && (
                <Contactinfo setIsOpen={setIsOpen} Bg_color={props.Bg_color} setPayment={props.setPayment}
                    HotelName={props.HotelName} HotelLogo={props.HotelLogo} BookingTax={BookingTax}
                    BookingTotalPrice={BookingTotalPrice} BookingPrice={BookingPrice}
                    Paymentbutton={props.Paymentbutton} nights={Nights} room={Rooms}
                    color={props.color} price={Price} grandtotal={Grandtotal} type={props.roomtype} />
            )}


        </>
    )
}
