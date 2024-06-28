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
          <Header header={<Link to ="/home" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="ABOUT US" />
        </div>
        
        <div className = "aboutus-container">
          {aboutUsButtons.map ((button, index) => (
          <Link key={index} to={button.to}>
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

