import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTripadvisor, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
// import FooterLogo from '../Images/backgroundimge.jpeg'
import FooterLogo from '../Images/WhatsApp.svg.png'
import FooterLogo1 from '../Images/call1.png'
import HTMLReactParser from 'html-react-parser'
import { useTranslation } from 'react-i18next';
import './i18n'; // Import your i18n configuration


export default function Footer(props) {

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [termsShow, settermsShow] = useState(false);
  const [paymentShow, setpaymentShow] = useState(false);
  const [cancellationShow, setcancellationShow] = useState(false);



  return (
    <>

      <footer className={`${props.display}`} style={{ background: props.color }}>
        <div className="container footer_top">
          <div className="footer-outer row">
            <div className="footer-main footAdd col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 w-100">
              <div className="FootAddrs">
                <div className="footLogo">
                  <a href={props.hotelwebsite}  ><img src={props.Logo} alt="" /></a>
                </div>
                {/* <p className='my-2'>{HTMLReactParser(props.aboutus)}</p> */}
              </div>

              <div className="social-media">
                <h6 className='footHeading '>Follow Us</h6>
                <div className='Social_foot_icon'>
                  <Link className='fa-social' to={props.facebook} target="_blank" rel='noreferrer'><FaFacebookF className='footsocialicon' /></Link>
                  <Link className='fa-social' to={props.instagram} target="_blank" rel='noreferrer'><FaInstagram className='footsocialicon' /></Link>
                  <Link className='fa-social' to={props.twitter} target="_blank" rel='noreferrer'><FaTwitter className='footsocialicon' /></Link>
                  <Link className='fa-social' to={props.Tripadvisors} target="_blank" rel='noreferrer'><FaTripadvisor className='footsocialicon' /></Link>
                  <Link className='fa-social' to={props.Linkedin} target="_blank" rel='noreferrer'><FaLinkedinIn className='footsocialicon' /></Link>
                  <Link className='fa-social' to={props.Youtube} target="_blank" rel='noreferrer'><FaYoutube className='footsocialicon' /></Link>
                </div>


              </div>

            </div>

            <div className="reachUs col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2 w-100">
              <h6 className='footHeading'>Reach us at</h6>
              <p className="Contact-item"><i className="fa-solid fa-location-dot foot-icons"></i>
                {props.HotelAddress}
              </p>
              <ul className="contact-inner">
                <li><Link className="Contact-item" to={`mailto:${props.email}`} ><i className="fa-regular fa-envelope foot-icons"></i>{props.email}</Link>

                </li>
                <li><Link className="Contact-item" to={`tel:${props.HotelNumber}`}><i
                  className="fa-sharp fa-solid fa-phone foot-icons"></i> {props.HotelNumber}</Link></li>

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
              <h6 className='footHeading '>Policies</h6>
              <ul>
                <li >
                  <p style={{ 'cursor': "pointer" }} onClick={() => settermsShow(true)}>Terms & Conditions</p>
                </li>
                <li>
                  <p style={{ 'cursor': "pointer" }} onClick={() => setpaymentShow(true)}>Payment Terms</p>
                </li>
                <li>
                  <p style={{ 'cursor': "pointer" }} onClick={() => setcancellationShow(true)}>Cancellation & Refund
                    Policy</p>
                </li>
                {/* <li>
                  <Link to="/#">FAQs</Link>
                </li> */}
              </ul>
            </div>


            <div className="map col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 w-100"><iframe title='map'
              src={props.Location}
              width="800" height="600" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe></div>


          </div>
          <div className="copyright">
            {/* <div className="copyright-inner"> */}
            <span>&#169; {t('Copyright 2023')}
            </span>
            {/* </div> */}
            {/* <div className="copyright-inner copy-right"> */}
            <span>{t('Designed & Developed by')} <Link to="https://eazotel.com/" target='_blank'>Eazotel.com</Link></span>
            {/* </div> */}

          </div>
        </div>
      </footer >
      <div className='whatsapp_float'>
        <a href={`https://wa.me/${props.HotelNumber}`} target='_blank'><img src={FooterLogo} className='whatsapp_float_btn' /></a>
      </div>
      <div className='call_float'>
        <a href={`tel:${props.HotelNumber}`}><img src={FooterLogo1} className='call_float_btn' /></a>
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

    </>


  )
}
