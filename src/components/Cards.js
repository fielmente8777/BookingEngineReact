// import React from 'react';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';
import Contactinfo from '../components/Contactinfo';
import './i18n'; // Import your i18n configuration


export default function Cards(props) {
    const [BookingTax, setBookingTax] = useState(0)
    const [BookingTotalPrice, setBookingTotalPrice] = useState(0)
    const [BookingPrice, setBookingPrice] = useState(0)

    const [Original_Price, setOriginal_Price] = useState(props.price)
    const [Price, setPrice] = useState(props.price)
    const [Nights, setNights] = useState(0)
    const [Rooms, setRooms] = useState(0);
    const [Grandtotal, setGrandtotal] = useState(0)

    const [selectedOption, setSelectedOption] = useState(null);

    let Available_rooms = props.available;

    const [isOpen, setIsOpen] = useState(false);
    let Features = props.facilities;
    let images = props.images;
    // console.log(images)

    if (props.roomtype === "1") { props.setDeluxAdult(props.Adult) }
    if (props.roomtype === "2") { props.setSuperDeluxAdult(props.Adult) }
    if (props.roomtype === "3") { props.setSuiteAdult(props.Adult) }
    if (props.roomtype === "4") { props.setPremiumAdult(props.Adult) }
    if (props.roomtype === "5") { props.setPremiereRetreatAdult(props.Adult) }
    if (props.roomtype === "6") { props.setEliteSuiteAdult(props.Adult) }
    if (props.roomtype === "7") { props.setGrandDeluxeAdult(props.Adult) }
    if (props.roomtype === "8") { props.setImperialSuiteAdult(props.Adult) }
    if (props.roomtype === "9") { props.setSupremeRetreatAdult(props.Adult) }
    if (props.roomtype === "10") { props.setRoyalDeluxeAdult(props.Adult) }
    if (props.roomtype === "11") { props.setPrestigeSuiteAdult(props.Adult) }
    if (props.roomtype === "12") { props.setExclusiveRetreatAdult(props.Adult) }

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
            if (id === "Premiere Retreat"){
                props.setPremiereRetreat(number)
            }
            if (id === "Elite Suite"){
                props.setEliteSuite(number)
            }
            if (id === "Grand Deluxe"){
                props.setGrandDeluxe(number)
            }
            if (id === "Imperial Suite"){
                props.setImperialSuite(number)
            }
            if (id === "Supreme Retreat"){
                props.setSupremeRetreat(number)
            }
            if (id === "Royal Deluxe"){
                props.setRoyalDeluxe(number)
            }
            if (id === "Prestige Suite"){
                props.setPrestigeSuite(number)
            }
            if (id === "Exclusive Retreat"){
                props.setExclusiveRetreat(number)
            }
            let price = number * Number(Original_Price)
            setPrice(price)
            setRooms(number)
        }
    }

    const AddCount = (id) => {
        setIsOpen(false)
        let number = Number(document.getElementById(id).innerHTML);
        if (number < Available_rooms) {
            number += 1;
            if (id === "DELUX") {
                props.setDelux(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["DELUX"]: props.name,
                  }));
            }
            if (id === "SUPER DELUX") {
                props.setSuperDelux(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["SUPERDELUX"]: props.name,
                  }));
            }
            if (id === "SUITE") {
                props.setSuite(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["SUITE"]: props.name,
                  }));
            }
            if (id === "PREMIUM") {
                props.setPremium(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["PREMIUM"]: props.name,
                  }));
            }
            if (id === "Premiere Retreat") {
                props.setPremiereRetreat(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["PremiereRetreat"]: props.name,
                  }));
            }
            if (id === "Elite Suite") {
                props.setEliteSuite(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["EliteSuite"]: props.name,
                  }));
            }
            if (id === "Grand Deluxe") {
                props.setGrandDeluxe(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["GrandDeluxe"]: props.name,
                  }));
            }
            if (id === "Imperial Suite") {
                props.setImperialSuite(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["ImperialSuite"]: props.name,
                  }));
            }
            if (id === "Supreme Retreat") {
                props.setSupremeRetreat(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["SupremeRetreat"]: props.name,
                  }));
            }
            if (id === "Royal Deluxe") {
                props.setRoyalDeluxe(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["RoyalDeluxe"]: props.name,
                  }));
            }
            if (id === "Prestige Suite") {
                props.setPrestigeSuite(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["PrestigeSuite"]: props.name,
                  }));
            }
            if (id === "Exclusive Retreat") {
                props.setExclusiveRetreat(number)
                props.setRoomCategoryCombination((prevRoomcatname) => ({
                    ...prevRoomcatname,
                    ["ExclusiveRetreat"]: props.name,
                  }));
            }
            let price = number * Number(Original_Price)
            setPrice(price)
            setRooms(number)
        }

    }


    const { t, i18n } = useTranslation();

    // Change the language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };


    return (
        <>
            <div className="container"  >

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
                                <div className="last-rooms">
                                    <span class="badge text-bg-secondary">{props.tag}</span>
                                </div>

                            </div>
                            <div className="description">
                                <p className='room_description_style'>{t(props.description)}</p>
                            </div>
                            <div className="aminities-block">
                                <div className="aminities w-100">
                                    <div className="card_inr_icon">
                                        <i class="fa-solid fa-user"></i>X {props.Adult}
                                    </div>

                                    
                                </div>
                                <div className="room_price w-30">
                                    {/* <label>From</label>  */}
                                    {Rooms * (props.ratechange[props.roomtype].Price) !== 0 ? <h4 style={{ fontWeight: '600' }}><span id="total_price" style={{ fontSize: "22px" }}> {Rooms * (props.ratechange[props.roomtype].Price)}/- </span>{props.currency}</h4> : <h4 style={{ fontWeight: '600' }}><span id="total_price" style={{ fontSize: "22px" }}> {(props.ratechange[props.roomtype].Price)}/- </span>{props.currency}</h4>}
                                    {/* <span>Per Night</span> */}

                                    {/* <span style="color:red" className="span m-1">Last {{ Available }} Rooms</span>  */}
                                    <div className="no-rooms d-flex">
                                        <span>Room(s)</span>
                                        {Available_rooms !== 0 ?
                                            Rooms===0?
                                                <div className='soldBtn'>
                                                    <span class="badge text-bg-primary" style={{cursor:"pointer"}} onClick={() => { AddCount(props.type) }}>Add room</span>
                                                    <button className="btn-total d-none"
                                                    id={`${props.type}`}>{Rooms}</button>
                                                </div>
                                                :
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
                                                {props.facilities.airConditonar ? <li><i class="fa-regular fa-air-conditioner"></i> Air Conditioner</li> : ""}
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
                                                {props.facilities.Balcony ? <li>Balcony</li>:""}
                                                {props.facilities.Bath ? <li>Bath</li>:""}
                                                {props.facilities.View ? <li>View</li>:""}
                                                {props.facilities.FlatscreenTV ? <li>Flatscreen TV</li>:""}
                                                {props.facilities.Privatepool ? <li>Private Pool</li>:""}
                                                {props.facilities.Electrickettle ? <li>Electric Kettle</li>:""}
                                                {props.facilities.Spabath ? <li>Spa Bath</li>:""}
                                                {props.facilities.RoomAmenities ? <li>Room Amenities</li>:""}
                                                {props.facilities.Cots ? <li>Cots</li>:""}
                                                {props.facilities.Clothesrack ? <li>Clothes rack</li>:""}
                                                {props.facilities.FoldupBed ? <li>Foldup Bed</li>:""}
                                                {props.facilities.SofaBed ? <li>Sofa Bed</li>:""}
                                                {props.facilities.Trashcans ? <li>Trash Cans</li>:""}
                                                {props.facilities.Heatedpool ? <li>Heated Pool</li>:""}
                                                {props.facilities.Infinitypool ? <li>Infinity Pool</li>:""}
                                                {props.facilities.Plungepool ? <li>Plunge Pool</li>:""}
                                                {props.facilities.Poolcover ? <li>Pool Cover</li>:""}
                                                {props.facilities.Pooltowels ? <li>Pool Towels</li>:""}
                                                {props.facilities.Rooftoppool ? <li>Rooftop Pool</li>:""}
                                                {props.facilities.Dressingroom ? <li>Dressing Room</li>:""}
                                                {props.facilities.Fan ? <li>Fan</li>:""}
                                                {props.facilities.Fireplace ? <li>Fire Place</li>:""}
                                                {props.facilities.Heating ? <li>Heating</li>:""}
                                                {props.facilities.Iron ? <li>Iron</li>:""}
                                                {props.facilities.Ironingfacilities ? <li>Ironing Facilities</li>:""}
                                                {props.facilities.Hottub ? <li>Hottub</li>:""}
                                                {props.facilities.Mosquitonet ? <li>Mosquito Net</li>:""}
                                                {props.facilities.PrivateEntrance ? <li>Private Entrance</li>:""}
                                                {props.facilities.Sofa ? <li>Sofa</li>:""}
                                                {props.facilities.Soundproofing ? <li>Soundp Roofing</li>:""}
                                                {props.facilities.SeatingArea ? <li>Seating Area</li>:""}
                                                {props.facilities.Pantspress ? <li>Pants Press</li>:""}
                                                {props.facilities.Washingmachine ? <li>Washing Machine</li>:""}
                                                {props.facilities.Desk ? <li>Desk</li>:""}
                                                {props.facilities.Hypoallergenic ? <li>Hypoaller Genic</li>:""}
                                                {props.facilities.Cleaningproducts ? <li>Cleaning Products</li>:""}
                                                {props.facilities.Pajamas ? <li>Pajamas</li>:""}
                                                {props.facilities.Yukata ? <li>Yukata</li>:""}
                                                {props.facilities.Adapter ? <li>Adapter</li>:""}
                                                {props.facilities.Featherpillow ? <li>Feather Pillow</li>:""}
                                                {props.facilities.Non_feather_pillow ? <li>Non Feather Pillow</li>:""}
                                                {props.facilities.Bathroom ? <li>Bathroom</li>:""}
                                                {props.facilities.Privatebathroom ? <li>Private Bathroom</li>:""}
                                                {props.facilities.Shared_bathroom ? <li>Shared Bathroom</li>:""}
                                                {props.facilities.Toilet_paper ? <li>Toilet Paper</li>:""}
                                                {props.facilities.Bidet ? <li>Bidet</li>:""}
                                                {props.facilities.Bath_shower ? <li>Bath Shower</li>:""}
                                                {props.facilities.Bathrobe ? <li>Bathrobe</li>:""}
                                                {props.facilities.Free_toiletries ? <li>Free Toiletries</li>:""}
                                                {props.facilities.Additional_toilet ? <li>Additional Toilet</li>:""}
                                                {props.facilities.Hairdryer ? <li>Hairdryer</li>:""}
                                                {props.facilities.Shared_toilet ? <li>Shared Toilet</li>:""}
                                                {props.facilities.Sauna ? <li>Sauna</li>:""}
                                                {props.facilities.Shower ? <li>Shower</li>:""}
                                                {props.facilities.Slippers ? <li>Slippers</li>:""}
                                                {props.facilities.Toilet ? <li>Toilet</li>:""}
                                                {props.facilities.Additional_bathroom ? <li>Additional Bathroom</li>:""}
                                                {props.facilities.Toothbrush ? <li>Toothbrush</li>:""}
                                                {props.facilities.Shampoo ? <li>Shampoo</li>:""}
                                                {props.facilities.Conditioner ? <li>Conditioner</li>:""}
                                                {props.facilities.Cd_player ? <li>Cd Player</li>:""}
                                                {props.facilities.Dvd_player ? <li>Dvd Player</li>:""}
                                                {props.facilities.Fax ? <li>Fax</li>:""}
                                                {props.facilities.SeatingArea ? <li>SeatingArea</li>:""}
                                                {props.facilities.Pantspress ? <li>Pantspress</li>:""}
                                                {props.facilities.Washingmachine ? <li>Washing Machine</li>:""}
                                                {props.facilities.Radio ? <li>Radio</li>:""}
                                                {props.facilities.Satellitechannels ? <li>Satellite Channels</li>:""}
                                                {props.facilities.Telephone ? <li>Telephone</li>:""}
                                                {props.facilities.Tv ? <li>Tv</li>:""}
                                                {props.facilities.Smartphone ? <li>Smartphone</li>:""}
                                                {props.facilities.Streamingservice_like_Netflix ? <li>Streaming Service Like Netflix</li>:""}
                                                {props.facilities.Dining_table ? <li>Dining Table</li>:""}
                                                {props.facilities.Bottle_of_water ? <li>Bottle of Water</li>:""}
                                                {props.facilities.Chocolate_or_cookies ? <li>Chocolate or Cookies</li>:""}
                                                {props.facilities.Fruits ? <li>Fruits</li>:""}
                                                {props.facilities.Barbecue ? <li>Barbecue</li>:""}
                                                {props.facilities.Oven ? <li>Oven</li>:""}
                                                {props.facilities.Stovetop ? <li>Stovetop</li>:""}
                                                {props.facilities.Toaster ? <li>Toaster</li>:""}
                                                {props.facilities.Dishwasher ? <li>Dishwasher</li>:""}
                                                {props.facilities.Outdoor_furniture ? <li>Outdoor Furniture</li>:""}
                                                {props.facilities.Minibar ? <li>Minibar</li>:""}
                                                {props.facilities.Kitchen ? <li>Kitchen</li>:""}
                                                {props.facilities.Key_card_access ? <li>Key Card Access</li>:""}
                                                {props.facilities.Lockers ? <li>Lockers</li>:""}
                                                {props.facilities.Key_access ? <li>Key Access</li>:""}
                                                {props.facilities.Alarm_clock ? <li>Alarm Clock</li>:""}
                                                {props.facilities.Wake_up_service ? <li>Wake Up Service</li>:""}
                                                {props.facilities.Linen ? <li>Linen</li>:""}
                                                {props.facilities.Blanket ? <li>Blanket</li>:""}
                                                {props.facilities.Extra_blankets ? <li>Extra Blankets</li>:""}
                                                {props.facilities.Pillow ? <li>Pillow</li>:""}
                                                {props.facilities.Towels ? <li>Towels</li>:""}
                                                {props.facilities.Patio ? <li>Patio</li>:""}
                                                {props.facilities.City_view ? <li>City View</li>:""}
                                                {props.facilities.Garden_view ? <li>Garden View</li>:""}
                                                {props.facilities.Lake_view ? <li>Lake View</li>:""}
                                                {props.facilities.Landmark_view ? <li>Landmark View</li>:""}
                                                {props.facilities.Mountain_view ? <li>Mountain View</li>:""}
                                                {props.facilities.Pool_view ? <li>Pool View</li>:""}
                                                {props.facilities.River_view ? <li>River View</li>:""}
                                                {props.facilities.Sea_view ? <li>Sea View</li>:""}
                                                {props.facilities.Hearingaccessible ? <li>Hearing Accessible</li>:""}
                                                {props.facilities.Adaptedbath ? <li>Adapted Bath</li>:""}
                                                {props.facilities.Raisedtoilet ? <li>Raised Toilet</li>:""}
                                                {props.facilities.Loweredsink ? <li>Lowered Sink</li>:""}
                                                {props.facilities.Showerchair ? <li>Shower Chair</li>:""}
                                                {props.facilities.Entertainment_family_services ? <li>Entertainment Family Services</li>:""}
                                                {props.facilities.Baby_safety_gates ? <li>Baby Safety Gates</li>:""}
                                                {props.facilities.Books ? <li>Books</li>:""}
                                                {props.facilities.DVDs ? <li>DVDs</li>:""}
                                                {props.facilities.Smokealarm ? <li>Smoke Alarm</li>:""}
                                                {props.facilities.Fire_extinguisher ? <li>Fire Extinguisher</li>:""}
                                                {props.facilities.Safety_features ? <li>Safety Features</li>:""}
                                                {props.facilities.Air_purifiers ? <li>Air Purifiers</li>:""}
                                                {props.facilities.Physicaldistancing ? <li>Physical Distancing</li>:""}
                                                {props.facilities.Handsanitiser ? <li>Hand Sanitiser</li>:""}
                                            </ul>
                                        </div>

                                    </div>
                                    
                                </div>
                            </Tab>
                            <Tab eventKey="gallery" title="Gallery" style={{ color: 'black' }}>

                                <div className='room_card_img'>

                                    {images.map((element) => {

                                        return <img src={element} alt="" />
                                    }

                                    )}



                                </div>
                                
                            </Tab>
                            

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
