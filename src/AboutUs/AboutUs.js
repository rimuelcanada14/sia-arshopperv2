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
    <>
        <div className='aboutus-header'>
            <Header header={<a href = "/home" className="category-back">BACK</a>} headerright="ABOUT US" 
            headersub={<a href = "/home" className="aboutus-sub">h</a>}/>
        </div>
        
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
    </>
        
  );
}




export default AboutUs;

