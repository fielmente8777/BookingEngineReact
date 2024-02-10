// import React from 'react';
import HTMLReactParser from 'html-react-parser';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';
import Contactinfo from '../components/Contactinfo';
import './i18n'; // Import your i18n configuration


export default function Cards(props) {
    const baseUrl = props.baseUrl

    const [selectedOption, setSelectedOption] = useState(null);

    let Available_rooms = props.available;

    const [isOpen, setIsOpen] = useState(false);
    let Features = props.facilities;
    let images = props.images;




    


    const { t, i18n } = useTranslation();

    // Change the language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };

    const paymentforpackage=()=>{
        setIsOpen(true)
    }

    return (
        <>
            <div className="container mb-3"  >

                {/* filters start   */}

                {/* filters end  */}
                <div className="card_details" style={{ background: '#fff' }}>
                    <div className="card_inner">
                        

                        <Carousel>
                            {images.map((element) => {

                                return <Carousel.Item>

                                    <div class="carousel-item active">
                                        <img src={element} class="d-block w-100 h-auto" alt="..." />
                                    </div>

                                </Carousel.Item>
                            }

                            )}
                        </Carousel>




                        <div className="main_description">
                            <div className="room-last d-flex justify-content-between ">
                                <div className="room-name">
                                    <h3 style={{ fontWeight: '600' }}>{t(props.name)}</h3>
                                </div>
                                

                            </div>
                            <div className="room-last d-flex justify-content-between ">
                                <div className="room-name">
                                    <p>{t(props.description)}</p>
                                </div>
                                

                            </div>
                            <div className="aminities-block">
                                <div className="aminities w-100">
                                <div className="card_inr_icon">
                                        <p><strong>Stay:</strong> {props.NoofDays} days and {props.NoofNight} nights</p>
                                    </div>
                                    <div className="card_inr_icon">
                                        <p><strong>Guests Included:</strong> {props.packageguests}</p>
                                    </div>
                                    

                                    
                                </div>
                                <div className="room_price w-30">
                                    {/* <label>From</label>  */}
                                    <h4 style={{ fontWeight: '600' }}>{props.price} /- {props.currency}</h4>

                                    {/* <span style="color:red" className="span m-1">Last {{ Available }} Rooms</span>  */}
                                    

                                    <div className="reser">
                                        {/* <p>Adults Allowed: {props.Adult}</p> */}
                                        <button className="reserve_btn" id="reserve_button" style={{ backgroundColor: props.color }} onClick={()=>{paymentforpackage()}}>Reserve</button>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                    <div className='card_tab'>
                        <Tabs
                            defaultActiveKey="gallery"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                            >

                            
                            
                            <Tab eventKey="gallery" title="Image" style={{ color: 'black' }}>

                                <div className='room_card_img'>

                                    {images.map((element) => {

                                        return <img src={element} alt="" />
                                    }

                                    )}



                                </div>
                               
                            </Tab>

                            <Tab eventKey="Description" title="Inclusions" style={{ color: 'black' }}>

                                <div className='room_card_img'>

                                {HTMLReactParser(props.packageInclusion)}
                                    



                                </div>
                               
                            </Tab>

                            <Tab eventKey="Itinerary" title="Itinerary" style={{ color: 'black' }}>

                                <div className='room_card_img'>

                                {HTMLReactParser(props.packageItinerary)}
                                    



                                </div>
                               
                            </Tab>
                            
                        </Tabs>

                    </div>
                </div>
                {isOpen && (
                <Contactinfo 
                    addTax={props.addTax}
                    GatewayConnected={props.GatewayConnected}
                    baseUrl = {baseUrl}
                    isPayatHotel = {props.isPayatHotel}
                    isOnlinepay={props.isOnlinepay}
                    setIsOpen={setIsOpen} 
                    Bg_color={props.Bg_color} 
                    setPayment={props.setPayment}
                    HotelName={props.HotelName} HotelLogo={props.HotelLogo} BookingTax={1}
                    BookingTotalPrice={1} BookingPrice={1}
                    Paymentbutton={props.Paymentbutton}  room={1}
                    color={props.color}  grandtotal={1} 
                    packageId={props.packageId} 
                    currency = {props.currency}
                    PackageName={props.name} 
                    PackageNights={props.NoofNight}
                    PackageDays={props.NoofDays}
                    PackageGuest={props.packageguests}
                    Packageprice={props.price} 
                    roomtype = {props.roomType}
                    RoomCategoryCombination={props.RoomCategoryCombination}
                     />
            )}
            </div>

        </>
    )
}
