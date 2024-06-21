// ProductRenderer.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';

function ProductRenderer({ products, categoryTitle }) {
  return (
    <div>
      <Header header={<Link to="/category" className="beverages-back">BACK</Link>} headersub="&nbsp;" headerright={categoryTitle} />
      <div>
        {products.map((product, index) => (
          <Link key={index} to={product.name}>
            <br />
            <button className="beverages-buttons">
              <img className="beverages-img" src={product.image} alt={product.name} />
              <span className="button-label">{product.name}<br />PHP {product.price}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductRenderer;
