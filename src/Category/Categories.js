import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import './Categories.css';
import Header from '../components/header';


function Category() {
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

    
      const categoryButtons = [
        {label: 'Beverages', to: '/beverages'},
        {label: 'Snacks', to: '/snacks'},
        {label: 'Hair Products', to: 'hairproduct'},
        {label: 'Dairy Products', to: 'dairyproduct'},
        {label: 'Beverages', to: '/beverages'},
        {label: 'Snacks', to: '/snacks'},
        {label: 'Hair Products', to: 'hairproduct'},
        {label: 'Add Margin', to: 'addmargin', categoryBottom: true},
      ];
    
    return (
      <div>
            <Header header={<Link to ="/home" className="beverages-back">BACK</Link>} headersub="&nbsp;" headerright="CATEGORIES" />
        
        
        <div>
          {categoryButtons.map((button, index) => (
            <Link key={index} to={button.to}>
              <br></br>
                 <button className={`categoryButtons ${button.categoryBottom ? 'categoryBottom' : ''}`}>
                    {button.label}
                </button>
            </Link>
          ))}
        </div>
      </div>
    );
  }

export default Category;