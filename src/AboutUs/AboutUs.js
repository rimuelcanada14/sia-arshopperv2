import React from 'react';
import {Link} from 'react-router-dom';
import './AboutUs.css';
import Header from '../components/header';


    
function AboutUs() {

    const aboutUsButtons = [
        {label: 'History of the Store', to: '/IchimartInfo'},
        {label: 'Developers Information', to: '/DevInfo'},
        {label: 'ARShoppers Developers', to: '/DevImage'},
        
    ];

    
    return (
        <div>
            <Header header={<a href = "/home" classname="back-btn">BACK</a>} headerright="AboutUs" />

            <div>
              {aboutUsButtons.map ((button, index) => (
                <Link key={index} to={button.to}>
                  <br></br>
                  <button className={`aboutUsButtons`}>
                  {button.label}
                  </button>
                </Link>
              ))}
            </div>
        </div>
  );
}


export default AboutUs;

