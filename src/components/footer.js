import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";

const Footer = () => {
    return (
        <div className="footer">
          <ul className='footer-icons'>
            <Link to="">
              <FaUserCircle className='footer-icon'/>
            </Link>
            <Link to="/home">
              <AiFillHome className='footer-icon' />
            </Link>
            <Link to ="">
              <RiLogoutCircleLine className='footer-icon' />
            </Link>
          </ul>
        </div>
    )
}

export default Footer;