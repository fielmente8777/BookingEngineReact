import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTripadvisor,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import FooterLogo from '../Images/backgroundimge.jpeg'
import HTMLReactParser from "html-react-parser";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import FooterLogo from "../Images/WhatsApp.svg.png";
import FooterLogo1 from "../Images/call1.png";
import "../style/DetailModal.css";
import "./i18n"; // Import your i18n configuration
function DetailModal(props) {
  const [isotpgenerated, setisotpgenerated] = useState(false);
  const [OTP, setOTP] = useState("");
  if (props.show === false) {
    return;
  }
  const cancelBooking = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel the booking?"
    );
    console.log(OTP);
    if (confirmCancel) {
      const response = await fetch(
        `${props.baseUrl}/booking/cancelwithoutOtp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ndid: localStorage.getItem("hotelid"),
            bookingId: props.details.bookingId,
            hId: localStorage.getItem("hid"),
          }),
        }
      );
      console.log(response);
      const data = await response.json();
      if (data.Status == true) {
        alert("Booking Cancelled");
        props.onHide();
      } else {
        alert("Cancellation failed");
      }
    } else {
      console.log("Booking cancellation cancelled");
    }
  };

  const handleClick = async () => {
    console.log(localStorage.getItem("hotelid"));
    console.log(localStorage.getItem("hid"));
    const response = await fetch(`${props.baseUrl}/booking/generateotp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ndid: localStorage.getItem("hotelid"),
        bookingId: props.details.bookingId,
        hId: localStorage.getItem("hid"),
      }),
    });
    const data = await response.json(); // Await the response.json() method
    if (data.Status == true) {
      setisotpgenerated(true);
      console.log(data);
    }
  };
  console.log(props.details);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Booking Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="outerdetaildiv">
          <div>BookingId</div>
          <div>{props.details.bookingId}</div>
        </div>
        <div className="outerdetaildiv">
          <div>Name</div>
          <div>{props.details.guestInfo.guestName}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>Phone</div>
          <div>{props.details.guestInfo.Phone}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>Email</div>
          <div>{props.details.guestInfo.EmailId}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>Booking Details</div>
          {props.details.bookingDetails.map((ele, index) => (
            <div key={index}>
              {ele.RoomType} {"  ,"} {ele.Quantity}
            </div>
          ))}
        </div>

        <div className="outerdetaildiv">
          <div>BookingDate</div>
          <div>{props.details.bookingDate}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>Adults and Kids</div>
          <div>
            {props.details.Adults} Adults and {props.details.Kids} Kids
          </div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>Address</div>
          <div>{props.details.guestInfo.address}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>City And Country</div>
          <div>
            {props.details.guestInfo.City}
            {" , "}
            {props.details.guestInfo.Country.label}
          </div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>Room Number Assigned</div>
          <div>{props.details.roomNumbers}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>PaymentMode</div>
          <div>{props.details.paymentMode}</div>{" "}
        </div>
        <div className="outerdetaildiv">
          <div>PaymentStatus</div>
          <div>{props.details.paymentStatus}</div>{" "}
        </div>
        {/* {isotpgenerated === true ? (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: "2rem",
              margin: "2rem",
            }}
          >
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
            />
            <ResendOTP onResendClick={handleClick} />
          </div>
        ) : (
          <div></div>
        )} */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            // onClick={isotpgenerated ? cancelBooking : handleClick}
            onClick={cancelBooking}
          >
            Cancel Booking
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
function MyVerticallyCenteredModal(props) {
  const handleBookingIdChange = (event) => {
    setbookingId(event.target.value); // Update the bookingId state with the entered value
  };
  const handleClick = async () => {
    console.log(localStorage.getItem("hotelid"));
    console.log(localStorage.getItem("hid"));
    const response = await fetch(
      `${props.baseUrl}/payment/getBookingDetailsforcancellation`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ndid: localStorage.getItem("hotelid"),
          bookingId: bookingId,
          hId: localStorage.getItem("hid"),
        }),
      }
    );
    const data = await response.json(); // Await the response.json() method
    console.log(data.status);
    if (data.status == true) {
      setdetailModalShow(true);
      setDetails(data.data);
    }
    props.onHide();
  };
  const [bookingId, setbookingId] = useState("");
  const [detailmodalShow, setdetailModalShow] = useState(false);
  const [details, setDetails] = useState(null);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booking Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>BookingId</Form.Label>
              <Form.Control
                type="text" // Use type="text" for booking ID input
                placeholder="Enter your Booking Id"
                value={bookingId} // Bind the input value to the bookingId state
                onChange={handleBookingIdChange} // Handle changes in the input
              />
            </Form.Group>
            <Button variant="primary" onClick={handleClick}>
              Fetch Details
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <DetailModal
        show={detailmodalShow}
        baseUrl={props.baseUrl}
        onHide={() => setdetailModalShow(false)}
        details={details}
      />
    </>
  );
}

export default function Footer(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [termsShow, settermsShow] = useState(false);
  const [paymentShow, setpaymentShow] = useState(false);
  const [cancellationShow, setcancellationShow] = useState(false);

  return (
    <>
      <footer
        className={`${props.display}`}
        style={{ background: props.color }}
      >
        <div className="container footer_top">
          <div className="footer-outer row">
            <div className="footer-main footAdd col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 w-100">
              <div className="FootAddrs">
                <div className="footLogo">
                  <a href={props.hotelwebsite}>
                    <img src={props.Logo} alt="" />
                  </a>
                </div>
                {/* <p className='my-2'>{HTMLReactParser(props.aboutus)}</p> */}
              </div>

              <div className="social-media">
                <h6 className="footHeading ">Follow Us</h6>
                <div className="Social_foot_icon">
                  <Link
                    className="fa-social"
                    to={props.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookF className="footsocialicon" />
                  </Link>
                  <Link
                    className="fa-social"
                    to={props.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="footsocialicon" />
                  </Link>
                  <Link
                    className="fa-social"
                    to={props.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter className="footsocialicon" />
                  </Link>
                  <Link
                    className="fa-social"
                    to={props.Tripadvisors}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTripadvisor className="footsocialicon" />
                  </Link>
                  <Link
                    className="fa-social"
                    to={props.Linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedinIn className="footsocialicon" />
                  </Link>
                  <Link
                    className="fa-social"
                    to={props.Youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaYoutube className="footsocialicon" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="reachUs col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2 w-100">
              <h6 className="footHeading">Reach us at</h6>
              <p className="Contact-item">
                <i className="fa-solid fa-location-dot foot-icons"></i>
                {props.HotelAddress}
              </p>
              <ul className="contact-inner">
                <li>
                  <Link className="Contact-item" to={`mailto:${props.email}`}>
                    <i className="fa-regular fa-envelope foot-icons"></i>
                    {props.email}
                  </Link>
                </li>
                <li>
                  <Link
                    className="Contact-item"
                    to={`tel:${props.HotelNumber}`}
                  >
                    <i className="fa-sharp fa-solid fa-phone foot-icons"></i>{" "}
                    {props.HotelNumber}
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div className="footeuseful_links col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2">
              <h6 className='footHeading'>Links</h6>
              <ul>
                <li>
                  <Link to="/#" >Home</Link>
                </li>
                <li>
                  <Link to="/#">About Us</Link>
                </li>
                <li>
                  <Link to="/#">Contact</Link>
                </li>
              </ul>
            </div> */}

            <div className="foot_policies col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2 w-100">
              <h6 className="footHeading ">Policies</h6>
              <ul>
                <li>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => settermsShow(true)}
                  >
                    Terms & Conditions
                  </p>
                </li>
                <li>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => setpaymentShow(true)}
                  >
                    Payment Terms
                  </p>
                </li>
                <li>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => setcancellationShow(true)}
                  >
                    Cancellation & Refund Policy
                  </p>
                </li>
                {props.AuthenticatedUser?<li>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => setModalShow(true)}
                  >
                    Cancel Booking
                  </p>
                </li>:""}
                {/* <li>
                  <Link to="/#">FAQs</Link>
                </li> */}
              </ul>
            </div>

            <div className="map col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 w-100">
              <iframe
                title="map"
                src={props.Location}
                width="800"
                height="600"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="copyright">
            {/* <div className="copyright-inner"> */}
            <span>&#169; {t("Copyright 2023")}</span>
            {/* </div> */}
            {/* <div className="copyright-inner copy-right"> */}
            <span>
              {t("Designed & Developed by")}{" "}
              <Link to="https://eazotel.com/" target="_blank">
                Eazotel.com
              </Link>
            </span>
            {/* </div> */}
          </div>
        </div>
      </footer>
      <div className="whatsapp_float">
        <a href={`https://wa.me/${props.HotelNumber}`} target="_blank">
          <img src={FooterLogo} className="whatsapp_float_btn" />
        </a>
      </div>
      <div className="call_float">
        <a href={`tel:${props.HotelNumber}`}>
          <img src={FooterLogo1} className="call_float_btn" />
        </a>
      </div>

      <Modal
        size="lg"
        show={termsShow}
        onHide={() => settermsShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Terms & Conditions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{HTMLReactParser(props.Termsconditions)}</Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={paymentShow}
        onHide={() => setpaymentShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Payment Terms
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{HTMLReactParser(props.Privacypolicy)}</Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={cancellationShow}
        onHide={() => setcancellationShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Cancellation & Refund Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{HTMLReactParser(props.Cancellation)}</Modal.Body>
      </Modal>
      <MyVerticallyCenteredModal
        show={modalShow}
        baseUrl={props.baseUrl}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
