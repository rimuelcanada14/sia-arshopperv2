import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import './Categories.css';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
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
    // }, [setMessage]);

    
      const categoryButtons = [
        {label: 'Beverages', to: '/beverages'},
        {label: 'Snacks', to: '/snacks'},
        {label: 'Hair Products', to: 'hairproduct'},
        {label: 'Dairy Products', to: 'dairyproduct'},
      ];
    
    return (
      <div>
        <Header header="Category" />
        {/* <h1 className="category-header-text"><MdOutlineArrowBackIosNew  className="cetegory-back-button"/>Category</h1> */}
        
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