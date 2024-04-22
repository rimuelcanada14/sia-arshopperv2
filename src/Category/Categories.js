import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Outlet,} from 'react-router-dom';
import './Categories.css';
import { MdOutlineArrowBackIosNew } from "react-icons/md";


function Category() {
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

    
      const categoryButtons = [
        {label: 'Beverages', to: '/beverages'},
        {label: 'Snacks', to: '/snacks'},
        {label: 'Hair Products', to: 'hairproduct'},
        {label: 'Dairy Products', to: 'dairyproduct'},
      ];
    
    return (
      <div>
        <div className="category-header">
          <span>
            
            <h1 className="category-header-text"><MdOutlineArrowBackIosNew  className="cetegory-back-button"/>Category</h1>
          </span>
        </div>
        
        <div>
          {categoryButtons.map((button, index) => (
            <Link key={index} to={button.to}>
              <br></br>
              <button className="categoryButtons">{button.label}</button>
            </Link>
          ))}
        </div>
      </div>
    );
  }

export default Category;