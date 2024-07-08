import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import LeftBotJunk from '../3DModels/LeftBotJunk'


    
function LocationRenderer() {

      

    return (
    <>
        <div className='aboutus-header'>
          <Header header={<Link to ="/category" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="LOCATION" />
        </div>
        
        <LeftBotJunk />

        <div>
          <Footer />
        </div>
    </>
        
  );
}




export default LocationRenderer;

