import React from 'react';
import './Profile.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { LuScanLine } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';


function Profile () {
  return (
    <>
      {/* header */}
      <Header header="Profile" headerright="ICHI MART" headersub="©" className='profile-header' />

      {/* content */}
      <div className='profile-icon'>
        <h1>profile photo nandito</h1>
      </div>

      <div className='profile-container'>
          <Link to ="">
            <div className='profile-btn'>
              <LuScanLine className="profile-btn-icon-left"/>
              <div className='profile-categories'>INFORMATION</div>
              <MdOutlineKeyboardArrowRight className="profile-btn-icon-right"/>
            </div>
          </Link>
          <Link to ="">
            <div className='profile-btn'>
              <ImSearch className="profile-btn-icon-left" />
              <div className='profile-categories'>LIKES</div>
              <MdOutlineKeyboardArrowRight className="profile-btn-icon-right"/>
            </div>
          </Link>
          <Link>
            <div className='profile-btn'>
              <FaPeopleGroup className="profile-btn-icon-left" />
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