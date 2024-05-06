import React from 'react';
import './Profile.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { RiInformation2Fill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';


function Profile () {
  return (
    <>
      {/* header */}
      <Header header="Profile" headerright="ICHI MART" headersub="©" className='profile-header' />

      {/* content */}
      <img className='profile-icon' src='ProfileImage/profile.png' alt='profileimage'></img>

      <div className='profile-container'>
          <Link to ="">
            <div className='profile-btn'>
              <RiInformation2Fill className="profile-btn-icon-left"/>
              <div className='profile-categories'>INFORMATION</div>
              <MdOutlineKeyboardArrowRight className="profile-btn-icon-right"/>
            </div>
          </Link>
          <Link to ="">
            <div className='profile-btn'>
              <AiFillLike className="profile-btn-icon-left" />
              <div className='profile-categories'>LIKES</div>
              <MdOutlineKeyboardArrowRight className="profile-btn-icon-right"/>
            </div>
          </Link>
          <Link>
            <div className='profile-btn'>
              <FaHeartbeat className="profile-btn-icon-left" />
              <div className='profile-categories'>HEALTH STATUS</div>
              <MdOutlineKeyboardArrowRight className="profile-btn-icon-right"/>
            </div>
          </Link>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}
export default Profile;