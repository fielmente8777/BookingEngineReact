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
          <div className="footer-main col-3">
            <div className="FootAddrs">
              <div className="footLogo">
                <img src={FooterLogo} alt="" />
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

          <div className="col-3">
            <h6 className='footHeading'>Reach us at</h6>
            <p className="Contact-item"><i className="fa-solid fa-location-dot foot-icons"></i>
              ADDRESS: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis, felis a ultricies malesuada, sem tortor ultrices ante.
            </p>
            <p>Near Clubhouse Road old manali, Manali 175131 India.
            </p>
            <ul className="contact-inner">
              <li><Link className="Contact-item" to="#"><i className="fa-regular fa-envelope foot-icons"></i>{props.email}</Link>

              </li>
              <li><Link className="Contact-item" to="#"><i
                className="fa-sharp fa-solid fa-phone foot-icons"></i>97561437**</Link></li>

            </ul>

          </div>

          <div className="footeuseful_links col-1">
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

          <div className="foot_policies col-2">
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
          <div className="map col-3"><iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3374.1032103134894!2d77.18125107552578!3d32.2553051738861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1686917527144!5m2!1sen!2sin"
              width="600" height="450" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe></div>

          {/* <div className="map"> */}
          {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1814.1984800827395!2d73.67755159839476!3d24.575492999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967efecf87f0b8b%3A0x2708953a0e177443!2sTaj%20Lake%20Palace%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1685987887493!5m2!1sen!2sin"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe> */}

          {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3374.1032103134894!2d77.18125107552578!3d32.2553051738861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1686917527144!5m2!1sen!2sin"
              width="600" height="450" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe> */}
          {/* </div> */}
        </div>
        <div className="copyright">
          <div className="copyright-inner">
            <p>&#169; {t('Copyright 2023 Hotel Taj, Udaipur, India')}
            </p>
          </div>
          <div className="copyright-inner copy-right">
            <span>Designed & Developed by <Link to="https://eazotel.com/" target='_blank'>Eazotel.com</Link></span>
          </div>

        </div>
      </div>
    </footer >
  )
}
