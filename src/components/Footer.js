import React from 'react'

import { FaTripadvisor, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
// import FooterLogo from '../Images/backgroundimge.jpeg'
import FooterLogo from '../Images/img1.jpg'

import { useTranslation } from 'react-i18next';
import './i18n'; // Import your i18n configuration


export default function Footer(props) {

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };



  return (
    <footer className={`${props.display}`} style={{ background: props.color }}>
      <div className="container footer_top">
        <div className="footer-outer row">
          <div className="footer-main footAdd col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
            <div className="FootAddrs">
              <div className="footLogo">
                <img src={props.Logo} alt="" />
              </div>
              <p className='my-2'>{props.aboutus}</p>
            </div>

            <div className="social-media">
              <h6 className='footHeading'>Follow Us</h6>
              <div className='Social_foot_icon'>
                <Link className='fa-social' to={props.twitter} target="_blank" rel='noreferrer'><FaTwitter className='footsocialicon' /></Link>
                <Link className='fa-social' to={props.facebook} target="_blank" rel='noreferrer'><FaFacebookF className='footsocialicon' /></Link>
                <Link className='fa-social' to={props.instagram} target="_blank" rel='noreferrer'><FaInstagram className='footsocialicon' /></Link>
              </div>


            </div>

          </div>

          <div className="reachUs col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2">
            <h6 className='footHeading'>Reach us at</h6>
            <p className="Contact-item"><i className="fa-solid fa-location-dot foot-icons"></i>
              {props.HotelAddress}
            </p>
            <ul className="contact-inner">
              <li><Link className="Contact-item" to="#"><i className="fa-regular fa-envelope foot-icons"></i>{props.email}</Link>

              </li>
              <li><Link className="Contact-item" to="#"><i
                className="fa-sharp fa-solid fa-phone foot-icons"></i> {props.HotelNumber}</Link></li>

            </ul>

          </div>

          <div className="footeuseful_links col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2">
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
          </div>

          <div className="foot_policies col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2">
            <h6 className='footHeading'>Policies</h6>
            <ul>
              <li>
                <Link to="/#">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/#">Payment Terms</Link>
              </li>
              <li>
                <Link to="/#">Cancellation & Refund
                  Policy</Link>
              </li>
              <li>
                <Link to="/#">FAQs</Link>
              </li>
            </ul>
          </div>


          <div className="map col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3"><iframe
            src={props.Location}
            width="600" height="450" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe></div>


        </div>
        <div className="copyright">
          <div className="copyright-inner">
            <p>&#169; {t('Copyright 2023 Hotel Taj, Udaipur, India')}
            </p>
          </div>
          <div className="copyright-inner copy-right">
            <span>{t('Designed & Developed by')} <Link to="https://eazotel.com/" target='_blank'>Eazotel.com</Link></span>
          </div>

        </div>
      </div>
    </footer >
  )
}
