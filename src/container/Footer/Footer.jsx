import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { images } from "../../constants";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="app__footer section__padding">
      <div className="app__footer-links">
        <div className="app__footer-links_contact">
          <h1 className="app__footer-headtext">Contact us</h1>
          <p className="p__opensans">
            {" "}
            Ground floor, 2981, 12th Main road, HAL 2nd stage, Indiranagar,
            Bengaluru, Karnataka-5600008
          </p>
          <p className="p__opensans">+91 76859 44566</p>
          <p className="p__opensans">theSweetSphere@gmail.com</p>
        </div>
        <div className="app__footer-links_logo">
          <img src={images.logo} alt="footer_logo" />
          <div className="app__footer-links_icons">
            <FiFacebook />
            <FiTwitter />
            <FiInstagram />
          </div>
        </div>
        <div className="app__footer-links_work">
          <h1 className="app__footer-headtext">Working hours</h1>
          <p className="p__opensans">Monday-Friday</p>
          <p className="p__opensans">11:00 am - 7:00 pm</p>
          <p className="p__opensans">Saturday-Sunday</p>
          <p className="p__opensans">11:00 am- 2:00 pm</p>
        </div>
      </div>
      <div className="footer__copyright">
        2021 The Sweet Sphere. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
