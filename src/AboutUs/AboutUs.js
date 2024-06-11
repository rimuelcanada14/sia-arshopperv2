import React from 'react';
import {Link} from 'react-router-dom';
import './AboutUs.css';
import Header from '../components/header';
import Footer from '../components/footer';


    
function AboutUs() {



    const aboutUsButtons = [
        {label: 'History of the Store', to: '/History'},
        {label: 'Developers Information', to: '/DevInfo'},
        
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
        <div>
          <Footer />
        </div>
    </>
        
  );
}




export default AboutUs;

