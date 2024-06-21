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
        {label: 'Junk Foods', to: '/junkfoods'},
        {label: 'Ice Cream', to: 'hairproduct'},
        {label: 'Frozen Goods', to: 'dairyproduct'},
        {label: 'Pastry', to: '/beverages'},
        {label: 'Noodles/Pasta', to: '/snacks'},
        {label: 'Instant Noodles', to: 'hairproduct'},
        {label: 'Nibbles', to: 'hairproduct'},
        {label: 'Coffee/Milk', to: 'hairproduct'},
        {label: 'Biscuits', to: 'hairproduct'},
        {label: 'Candies', to: 'hairproduct'},
        {label: 'Liquor/Wines', to: 'hairproduct'},
        {label: 'Canned Goods', to: 'addmargin', categoryBottom: true},
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