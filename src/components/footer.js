// Footer.js
import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";

const Footer = ({ onResetScanner, onDisplayAR }) => {
    return (
        <div className="footer">
          <ul className='footer-icons'>
            <Link to="/Profile" onClick={() => { onResetScanner(); onDisplayAR('https://192.168.100.90:8000/api/products/${product.image}/'); }}>
              <FaUserCircle className='footer-icon' />
            </Link>
            <Link to="/Home" onClick={() => { onResetScanner(); onDisplayAR('https://192.168.100.90:8000/api/products/${product.image}/'); }}>
              <AiFillHome className='footer-icon' />
            </Link>
            <Link to ="/" onClick={() => { onResetScanner(); onDisplayAR('https://192.168.100.90:8000/api/products/${product.image}/'); }}>
              <RiLogoutCircleLine className='footer-icon' />
            </Link>
          </ul>
        </div>
    )
}

export default Footer;
