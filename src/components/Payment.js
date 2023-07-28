import React from 'react';

export default function Payment() {
    return (
        <div className="container">
            {/* contact information start 
            <div id="Contact">

                <div className="heading">
                    <h5>Guest Information</h5>
                </div>
                <div className="contact-main">
                    <div className="inner-contact-left">

                        <div className="code">
                            <div className="inputBox">
                                <span className="text-span">Full Name*</span>
                                <input type="text" className="bg" value="" name="name" id="name" readonly />
                            </div>
                            <div className="inputBox">
                                <span className="text-span">Email Id*</span>
                                <input type="email" className="bg" name="email" id="email" value="" readonly />
                            </div>
                            <div className="inputBox mobile">
                                <span className="text-span">Phone no.*</span>
                                <input type="tel" className="bg" name="number" id="number" value="" readonly />
                            </div>

                            <div className="content_inner inputBox">
                                <span className="text-span">Address</span>
                                <input type="text" className="bg" id="address" value="" readonly />
                            </div>

                            <div className="content_inner inputBox">
                                <span className="text-span">Special Requests</span>
                                <input type="text" className="bg" value="" readonly />
                            </div>
                        </div>
                    </div>
                    <div className="inner-contact-right">
                        <h4 className="m-2 text-center">Reservation details</h4>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div>
                                    <span><a onclick="toggleAccordion1(1);"
                                    >Edit<i
                                        className='fas fa-edit'></i></a></span>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">

                            <div className="cust-inner">
                                <div>
                                    <span className="left-span">Check</span>
                                </div>
                                <div>
                                    <span className="right-span" id="Final_checkin"></span>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div>
                                    <span className="left-span">Check Out</span>
                                </div>
                                <div>
                                    <span className="right-span" id="Final_checkout"></span>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div>
                                    <span className="left-span">No. of night</span>
                                </div>
                                <div>
                                    <p className="right-span"><span id="Final_night"></span>Night</p>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div>
                                    <span className="left-span">Rooms</span>
                                </div>
                                <div>
                                    <p className="right-span"><span id="Final_room"></span> Room</p>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div>
                                    <span className="left-span">No. of guests</span>
                                </div>
                                <div>
                                    <span className="right-span"><span id="Final_adult"></span> adults, <span id="Final_kid"></span>
                                        children</span>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div className="cust-sub d-flex flex-column py-2">
                                    <span className="left-span">Sub total</span>
                                    <span className="left-span">Taxes and fees</span>
                                </div>
                                <div className="cust-sub d-flex flex-column py-2">
                                    <span style={{fontWeight:550}}><span className="right-span" id="Final_price"></span>1500 INR</span>
                                    <span style={{fontWeight:550}}><span className="right-span" id="Final_tax"></span>500 INR</span>
                                </div>
                            </div>
                        </div>
                        <div className="cust-detail">
                            <div className="cust-inner">
                                <div className="py-2">
                                    <span className="left-span">GRAND TOTAL</span>
                                </div>
                                <div className="py-2">
                                    <span className="right-span"><span id="Final_payable_price"></span>2000 INR</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div> */}

            {/* contact information end */}

            {/* <div className="policies">

                <h3>Policies:</h3>
                <div className="poli-checks">
                    <div className="check">
                        <span><strong>Check-in</strong></span>
                        <span>After 12:00 PM</span>
                    </div>
                    <div className="poli-check">
                        <span><strong>Check-out</strong></span>
                        <span>Before 12:00 PM</span>
                    </div>
                </div>
                <div className="poli-detail">
                    <h4>ROOM 1 SMART SAVER ROOM</h4>
                    <div className="guarantee-poli">
                        <h4>Guarantee Policy</h4>
                        <p>The payment would be charged at the time of processing the booking. Refunds are subject to
                            the applicable
                            cancellation policy. Any increase in the tariff due to change in the taxes will be charged
                            to the guest
                            and
                            will be collected during check-out.</p>
                    </div>

                    <div className="cancel-poli">
                        <h4>Cancel Policy</h4>
                        <p>Free Cancellation up to 24 hours prior to check-in; cancellation received under 24 hours
                            would attract
                            one
                            night charge.</p>
                    </div>
                </div>

                <div className="acknowledgement">
                    <h3>Acknowledgement</h3>
                    <div className="ack-check"><input type="checkbox" id="myCheckbox" required />I agree with all the
                        Booking
                        Conditions and Privacy Policy.
                    </div>
                </div>

            </div> */}

            {/* policies end  */}

            <div className="bookingbtn">
                <button className="cmplt pay_button" id="rzp-button1" disabled>BOOK NOW</button>
            </div>
        </div>

    )
}