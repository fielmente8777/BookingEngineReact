// import React from 'react';
import React, { useState } from 'react';
import Contactinfo from '../components/Contactinfo';
import Carousel from 'react-bootstrap/Carousel';



export default function Cards(props) {
    const [TotalPrice, setTotalPrice] = useState(props.price)
    const [Original_Price, setOriginal_Price] = useState(props.price)
    const [Price, setPrice] = useState(props.price)
    const [Nights, setNights] = useState(0)
    const [Rooms, setRooms] = useState(1);
    const [Grandtotal, setGrandtotal] = useState(0)
    let Available_rooms = props.available;

    const [isOpen, setIsOpen] = useState(false);
    let Features = props.facilities;
    let images = props.images;
    console.log(images)


    const DelCount = (id) => {
        let number = Number(document.getElementById(id).innerHTML);
        if (number > 1) {
            number -= 1;
            let price = number * Number(Original_Price)
            setPrice(price)
            setRooms(number)
        }
    }

    const AddCount = (id) => {
        let number = Number(document.getElementById(id).innerHTML);
        if (number < Available_rooms) {
            number += 1;
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
        let total = await (Number(Nights) * Number(Price));
        setTotalPrice(total)



        setIsOpen(!isOpen);
    };


    return (
        <>
            <div className="container" >

                {/* filters start   */}

                {/* filters end  */}
                <div className="card_details">
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
                            <div className="room-last d-flex justify-content-between align-items-end">
                                <div className="room-name">
                                    <h3>{props.name}</h3>
                                    <span className="dec-sqr">{props.type}</span>
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
                                    <h3>Amenities</h3>
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
                                <div className="room_price w-30">
                                    {/* <label>From</label>  */}
                                    <h3><span id="total_price" style={{ fontSize: "24px" }}> {Price}/- </span> INR</h3>
                                    <span>Per Night</span>

                                    {/* <span style="color:red" className="span m-1">Last {{ Available }} Rooms</span>  */}
                                    <div className="no-rooms d-flex">
                                        <span>Room(s)</span>
                                        <div className="room">
                                            <button className="btn-minus" onClick={() => { DelCount(props.type) }}>-</button>
                                            <button className="btn-total"
                                                id={`${props.type}`}>{Rooms}</button>
                                            <button className="btn-plus" onClick={() => { AddCount(props.type) }}>+</button>
                                        </div>
                                    </div>

                                    <div className="reser">
                                        {/* <button className="reserve_btn d-none" id="reserve_button" onclick="Redirect_Book()">RESERVE</button> */}
                                        <button className="reserve_btn" id="reserve_button" style={{ backgroundColor: props.color }} onClick={toggleDiv}>{props.FinalConfirmButton}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Contact informtion start  */}

            {isOpen && (
                <Contactinfo Bg_color={props.Bg_color} setPayment={props.setPayment}
                HotelName={props.HotelName}
                HotelLogo={props.HotelLogo} Paymentbutton = {props.Paymentbutton} nights={Nights} room={Rooms} color={props.color} price={Price}  grandtotal={Grandtotal} type={props.roomtype}  />
            )}


        </>
    )
}
