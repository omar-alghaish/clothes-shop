import React from "react";
import { useTranslation } from "react-i18next";
import qrCode from "../imges/qr-code.png"

function Footer() {
  const [t, i18n] = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Brands</a>
            </li>
            <li>
              <a href="/">Investor Relations</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
            <li>
              <a href="/">Press</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Brands</h4>
          <ul>
            <li>
              <a href="/">Calvin Klein</a>
            </li>
            <li>
              <a href="/">Tommy Hilfiger</a>
            </li>
            <li>
              <a href="/">Van Heusen</a>
            </li>
            <li>
              <a href="/">IZOD</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Customer Support</h4>
          <ul>
            <li>
              <a href="/">Customer Service</a>
            </li>
            <li>
              <a href="/">Shipping</a>
            </li>
            <li>
              <a href="/">Returns</a>
            </li>
            <li>
              <a href="/">Size Guide</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <a href="/">Email: graziaegypt@gmail.com</a>
            </li>
            <li>
              <a href="/">Phone: +1-800-123-4567</a>
            </li>
            <li>
              <a href="/">Address: 123 Main Street, New York, NY</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-container2">
        
        <div className="qr-code">
          <img src={qrCode} alt="" />
        </div>
        
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Grazia. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
