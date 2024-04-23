import React from 'react';
import './Home.css';
import Header from '../components/header';
import { LuScanLine } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import {Link} from 'react-router-dom';

function Home() {
    return (
<>
      <div>
         <Header />
      </div>
        <div>

          <div className='home-container'>
            
          <Link to ="/signup">
            <div className='home-icon'>
              <LuScanLine className="icon"/>
              <h1 className='home-categories'>SCAN</h1>
            </div>
            </Link>
            
            <div className='home-icon'>
              <CiSearch className="icon" />
              <h1 className='home-categories'>SEARCH</h1>
            </div>
            
            <div className='home-icon'>
              <FaPeopleGroup className="icon" />
              <h1 className='home-categories'>ABOUT US</h1>
            </div>
          </div>

        <div className='footer'>
          {/* Footer content goes here */}
        </div>
      </div>
      </>
      
    );
}

export default Home;