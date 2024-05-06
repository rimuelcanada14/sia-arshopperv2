import React from 'react';
import "./Wayfinding.css"
import Header from '../components/header';
import Footer from '../components/footer';
import { LuScanLine } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import {Link} from 'react-router-dom';

function Wayfinding() {
    return (
    <>
        <div>
            <Header header={<a href = "/beverages" className="category-back">BACK</a>} headerright="BEVERAGES" />
        </div>

        <div className='wayfinding-container'>
            <div className="wayfinding-upper">
                <div className="wayfinding-drinks">
                    <p className="wayfinding-name">Drinks</p>
                    <div className='wayfinding-box'>
                    </div>
                </div>

                <div className="wayfinding-hygiene">
                    <p className="wayfinding-name">Hygiene</p>
                    <div className='wayfinding-box'>
                    </div>
                </div>

                <div className="wayfinding-laundry">
                    <p className="wayfinding-name">Laundry</p>
                    <div className='wayfinding-box'>
                    </div>
                </div>
            </div>

            <div className='wayfinding-lower'>
                <div className="wayfinding-icecream">
                    <p className="wayfinding-name">Ice Cream</p>
                    <div className='wayfinding-box'>
                    </div>
                </div>

                <div className="wayfinding-snack">
                    <p className="wayfinding-name">Snack</p>
                    <div className='wayfinding-box'>
                    </div>
                </div>

                <div className="wayfinding-liquor">
                    <p className="wayfinding-name">Liquor</p>
                    <div className='wayfinding-box'>
                    </div>
                </div>
            </div>
        
          <Footer />
        </div>
    </>
      
    );
}

export default Wayfinding;




