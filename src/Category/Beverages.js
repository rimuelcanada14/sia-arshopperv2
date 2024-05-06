import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import './Beverages.css';
import Header from '../components/header';

function Beverages() {
    // const [setMessage] = useState('');
  
    // useEffect(() => {
    //   axios.get('http://localhost:8000/api/hello-world/')
    //     .then(response => {
    //       setMessage(response.data.message);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, []);

    
      const beveragesButtons = [
        {label: 'C2 Green Tea Lemon 355ML', SecondaryLabel: 'PHP 40', to: '/wayfinding', imageUrl: '/ProductImage/green-tea.jpg'},
        {label: 'Kopiko Lucky Day', to: '', SecondaryLabel: 'PHP 29', imageUrl: '/ProductImage/green-tea.jpg'},
        {label: 'Nova Country Cheddar', to: '', SecondaryLabel: 'PHP 33', imageUrl: '/ProductImage/green-tea.jpg'},
        {label: 'Pillows Chocolate Crackers', to: '', SecondaryLabel: 'PHP 55', imageUrl: '/ProductImage/green-tea.jpg'},
      ];
    
    return (
      <div>
        <Header header={<a href="/category" className="beverages-back">BACK</a>} headerright="BEVERAGES" />
        {/* <h1 className="category-header-text"><MdOutlineArrowBackIosNew  className="cetegory-back-button"/>Category</h1> */}
        
        <div>
          {beveragesButtons.map((button, index) => (
            <Link key={index} to={button.to}>
              <br></br>
              <button className="beverages-buttons">
                
                <img className="beverages-img"src={button.imageUrl} alt={button.label} />
                <span className="button-label">{button.label}<br></br>{button.SecondaryLabel}</span>
                
                
                
              </button>
            </Link>
          ))}
        </div>
      </div>
    );
  }

export default Beverages;