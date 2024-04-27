import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { IoExit } from 'react-icons/io5';

const Footer = () => {
    return (
        <div className="footer">
          <ul className='footer-icons'>
            <Link to="">
              <FaUserCircle className='footer-icon'/>
            </Link>
            <Link to="">
              <IoIosHome className='footer-icon' />
            </Link>
            <Link to ="">
              <IoExit className='footer-icon' />
            </Link>
          </ul>
        </div>
    )
}

export default Footer;