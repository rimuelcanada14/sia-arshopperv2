import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import './Categories.css';
import Header from '../components/header';
import Footer from '../components/footer';



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
        {label: 'Ice Cream', to: '/icecream'},
        {label: 'Frozen Goods', to: '/frozengoods'},
        {label: 'Pastry', to: '/pastry'},
        {label: 'Noodles/Pasta', to: '/snacks'},
        {label: 'Condiments', to: 'condiments'},
        {label: 'Instant Noodles', to: 'hairproduct'},
        {label: 'Powder Juice', to: 'powderjuice'},
        {label: 'Oil Section', to: 'oilsection'},
        {label: 'Bread Spread', to: 'breadspread'},
        {label: 'Nibbles', to: 'hairproduct'},
        {label: 'Coffee/Milk', to: 'hairproduct'},
        {label: 'Biscuits', to: 'hairproduct'},
        {label: 'Candies', to: 'hairproduct'},
        {label: 'Liquor/Wines', to: 'hairproduct'},
        {label: 'Chocolates', to: 'chocolates'},
        {label: 'Diswashing/Laundry', to: 'diswashing/laundry'},
        {label: 'Toiletries', to: 'toiletries'},
        {label: 'Party Utensils', to: 'partyutensils'},
        {label: 'Canned Goods', to: 'addmargin', categoryBottom: true},
      ];
    
    return (
      <div>
        <Header header={<Link to ="/home" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="CATEGORIES" />

        <div className='category-container'>
          {categoryButtons.map((button, index) => (
            <Link key={index} to={button.to}>
                <button className={`categoryButtons ${button.categoryBottom ? 'categoryBottom' : ''}`}>
                  {button.label}
                </button>                 
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

export default Category;