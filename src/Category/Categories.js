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
        {label: 'Water', to: '/water'},
        {label: 'Condiments', to: '/condiments'},
        {label: 'Noodles/Pasta', to: '/noodlespasta'},
        {label: 'Instant Noodles', to: '/instantnoodles'},
        {label: 'Powdered Juice', to: '/powderedjuice'},
        {label: 'Oil Section', to: '/oilsection'},
        {label: 'Bread Spread', to: '/breadspread'},
        {label: 'Canned Goods', to: '/cannedgoods'},
        {label: 'Nibbles', to: '/nibbles'},
        {label: 'Coffee/Milk', to: '/coffeemilk'},
        {label: 'Biscuits', to: '/biscuits'},
        {label: 'Candies', to: '/candies'},
        {label: 'Chocolates', to: '/chocolates'},
        {label: 'Liquor/Wines', to: '/liquorwines'},
        {label: 'Party Utensils', to: '/partyutensils'},
        {label: 'Toiletries', to: '/toiletries'},
        {label: 'Diswashing/Laundry', to: '/diswashinglaundry', categoryBottom: true},
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