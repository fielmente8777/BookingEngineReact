import React from 'react'

import { FaTripadvisor, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

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
        <div className="footer-outer">
          <div className="footer-main">
            <div className="Contact">
              <h1>{t('Reach us at')}</h1>
              <ul className="contact-inner">
                {/* <li><a href="#" className="Contact-item"><i className="fa-solid fa-location-dot foot-icons"></i>
                  ADDRESS: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis, felis a ultricies malesuada, sem tortor ultrices ante.
                </a></li>  */}
                <li>
                  {/* <p>Near Clubhouse Road old manali, Manali 175131 India.
                  </p> */}
                </li>
                <li><a className="Contact-item" href="#">{t('EMAIL ID')}: &nbsp;{props.email}</a>
                  {/* <i className="fa-regular fa-envelope foot-icons"></i> */}
                </li>
                <li>
                  {/* <p>{props.aboutus}</p> */}
                  <p>{t('About Us')}</p>
                </li>
                {/* <li><a className="Contact-item" href="#"><i
                  className="fa-sharp fa-solid fa-phone foot-icons"></i>97561437**</a></li>  */}

              </ul>
            </div>

            <div className="social-media">
              <a className='fa-social' href={props.twitter} target="_blank" rel='noreferrer'><FaTwitter /></a>
              <a className='fa-social' href={props.facebook} target="_blank" rel='noreferrer'><FaFacebookF /></a>
              <a className='fa-social' href={props.instagram} target="_blank" rel='noreferrer'><FaInstagram /></a>


            </div>


            <div className="conditions">
              <div className="inner_conditions d-flex g-4">
                <a href="/#" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">{t('Terms & Conditions')} |</a>
                <a href="/#" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">{t('Payment Terms')} |</a>
                <a href="/#" data-bs-toggle="modal" data-bs-target="#staticBackdrop4">{t('Cancellation & Refund Policy')}</a>
              </div>
            </div>



          </div>

          <div className="map">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1814.1984800827395!2d73.67755159839476!3d24.575492999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967efecf87f0b8b%3A0x2708953a0e177443!2sTaj%20Lake%20Palace%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1685987887493!5m2!1sen!2sin"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe> */}

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3374.1032103134894!2d77.18125107552578!3d32.2553051738861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1686917527144!5m2!1sen!2sin"
              width="600" height="450" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="copyright">
          <div className="copyright-inner">
            <p>&#169; {t('Copyright 2023 Hotel Taj, Udaipur, India')}
            </p>
          </div>
          <div className="copyright-inner copy-right">
            <span>{t('Designed & Developed by')}<a href="https://eazotel.com/">Eazotel.com</a></span>
          </div>

        </div>
      </div>
    </footer>
  )
}
