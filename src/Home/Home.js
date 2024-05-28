import React from 'react';
import './Home.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { LuScanLine } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import {Link} from 'react-router-dom';

function Home() {
    return (
<>
        <div>
            <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
        </div>

        <div>
          <div className='home-container'>
            <Link to ="/barcodescan">
              <div className='home-icon'>
                <LuScanLine className="icon"/>
                <h1 className='home-categories'>SCAN</h1>
              </div>
            </Link>
              
            <Link to ="/category">
              <div className='home-icon'>
                <ImSearch className="icon" />
                <h1 className='home-categories'>SEARCH</h1>
              </div>
            </Link>

            <Link to ="/aboutUs">
              <div className='home-icon'>
                <FaPeopleGroup className="icon" />
                <h1 className='home-categories'>ABOUT US</h1>
              </div>
            </Link>
          </div>
          <div>
            <Footer />
          </div>
        </div>
    </>
      
    );
}

export default Home;