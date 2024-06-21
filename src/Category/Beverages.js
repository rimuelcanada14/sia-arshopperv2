import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Beverages.css';
import Header from '../components/header';

function Beverages() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get('https://localhost:8000/api/products/')
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products', error);
      });
    }, []);

    
      const beveragesButtons = products.map(product => ({
        label:product.name,
        SecondaryLabel: 'PHP ' + product.price,
        to: '',
        imageUrl: product.image,

      }));

    return (
      <div>
        <Header header={<Link to ="/category" className="beverages-back">BACK</Link>} headersub="&nbsp;" headerright="BEVERAGES" />
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