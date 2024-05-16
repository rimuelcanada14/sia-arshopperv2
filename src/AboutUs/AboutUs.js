import React from 'react';
import {Link} from 'react-router-dom';
import './AboutUs.css';
import Header from '../components/header';


    
function AboutUs() {

    const aboutUsButtons = [
        {label: 'History of the Store', to: '/IchimartInfo'},
        {label: 'Developers Information', to: '/DevInfo'},
        {label: 'ARShoppers Developers', to: '/DevImage'},
        {label: 'Add Margin', to: 'addmargin', aboutUsbottom: true},
    ];

    
    return (
        <div>
            <Header header={<b href = "/home" classname="back-btn">BACK</b>} headerright="AboutUs" />

            <div>
              {aboutUsButtons.map ((button, index) => (
                <Link key={index} to={button.to}>
                <br></br>
                <button classname={`aboutUsButtons ${button.aboutUsbottom ? 'aboutUsbottom' : ''}`}>
                {button.label}
                </button>
                </Link>
              ))}
            </div>
        </div>
  );
}


export default AboutUs;

