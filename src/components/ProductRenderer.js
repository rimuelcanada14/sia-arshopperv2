// ProductRenderer.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function ProductRenderer({ products, categoryTitle }) {
  return (
    <div>
      <Header header={<Link to="/category" className="products-back">BACK</Link>} headersub="&nbsp;" headerright={categoryTitle} />
      <div className='product-container'>
        {products.map((product, index) => (
          <Link key={index} to={product.name}>
            <button className="product-buttons">
              <img className="products-img" src={product.image} alt={product.name} />
              <span className="products-label">{product.name}<br />PHP {product.price}</span>
            </button>
          </Link>
        ))}
      </div>
    <Footer />
    </div>
  );
}

export default ProductRenderer;
