import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';

function ProductRenderer({ products, categoryTitle }) {
  const [likedProducts, setLikedProducts] = useState([]);

  const handleLike = async (productId) => {
    const mobileNumber = localStorage.getItem('mobileNumber'); // Assuming the mobile number is stored in local storage
  
    try {
      const response = await axios.post(`https://192.168.100.90:8000/api/products/${productId}/like/`, {
        mobileNumber: mobileNumber,
      });
      if (response.status === 200) {
        setLikedProducts((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
        alert(response.data.message);
      }
    } catch (error) {
      alert('Failed to like the product');
      console.error(error);
    }
  };
  
   
  return (
    <div>
      <Header header={<Link to="/category" className="products-back">BACK</Link>} headersub="&nbsp;" headerright={categoryTitle} />
      <div className='product-container'>
        {products.map((product, index) => (
          <div key={index}>
            <Link to={product.name}>
              <button className="product-buttons">
                <img className="products-img" src={product.image} alt={product.name} />
                <span className="products-label">{product.name}<br />PHP {product.price}</span>
              </button>
            </Link>
            <button
              className={`like-button ${likedProducts.includes(product.id) ? 'liked' : ''}`}
              onClick={() => handleLike(product.id)}
            >
              {likedProducts.includes(product.id) ? 'Unlike' : 'Like'}
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProductRenderer;
