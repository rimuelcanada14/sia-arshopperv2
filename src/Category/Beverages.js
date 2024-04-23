import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Outlet,} from 'react-router-dom';
import './Beverages.css';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Header from '../components/header';


function Beverages() {
    const [setMessage] = useState('');
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/hello-world/')
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    
      const beveragesButtons = [
        {label: 'C2 Green Tea Lemon 355ML', to: '', imageUrl: './public/ProductImage/green tea.jpg'},
        {label: 'Kopiko Lucky Day', to: ''},
        {label: 'Nova Country Cheddar', to: ''},
        {label: 'Pillows Chocolate Crackers', to: ''},
      ];
    
    return (
      <div>
        <Header header={<a href="/category" className="beverages-back">Back</a>} headerright="BEVERAGES" />
        {/* <h1 className="category-header-text"><MdOutlineArrowBackIosNew  className="cetegory-back-button"/>Category</h1> */}
        
        <div>
          {beveragesButtons.map((button, index) => (
            <Link key={index} to={button.to}>
              <br></br>
              <button className="beveragesButtons">{button.label}</button>
            </Link>
          ))}
        </div>
      </div>
    );
  }

export default Beverages;