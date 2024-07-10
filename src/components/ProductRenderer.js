import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import FontAwesome icons

function ProductRenderer({ products, categoryTitle }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    // Load liked products from local storage when the component mounts
    const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    setLikedProducts(storedLikedProducts);
  }, []);

  const handleLike = async (productId) => {
    const mobileNumber = localStorage.getItem('mobileNumber');
  
    try {
      const response = await axios.post(`https://localhost:8000/api/products/${productId}/like/`, {
        mobileNumber: mobileNumber,
      });
      if (response.status === 200) {
        const updatedLikedProducts = likedProducts.includes(productId)
          ? likedProducts.filter((id) => id !== productId)
          : [...likedProducts, productId];
  
        setLikedProducts(updatedLikedProducts);
        setPopupMessage(response.data.message);
        setTimeout(() => {
          setPopupMessage('');
        }, 2000); // Clear popup message after 2 seconds
      }
    } catch (error) {
      console.error('Failed to like the product:', error);
      setPopupMessage('Failed to like the product');
      setTimeout(() => {
        setPopupMessage('');
      }, 2000); // Clear popup message after 2 seconds
    }
  };

  const getRedirectPath = (location) => {
    switch (location) {
      case '1':
        return '/aisleone';
      case '2':
        return '/aisletwo';
      case '17':
        return '/aisle17';
      default:
        return '/';
    }
  };

  return (
    <div>
      <Header header={<Link to="/category" className="products-back">BACK</Link>} headersub="&nbsp;" headerright={categoryTitle} />
      <div className='product-container'>
        {products.map((product, index) => (
          <div key={index}>
            {/* Product button */}
            <Link to={getRedirectPath(product.location)}>
              <button className="product-buttons">
                <img className="products-img" src={product.image} alt={product.name} />
                <span className="products-label">{product.name}<br />PHP {product.price}</span>
                <div className="like-container">
                  <button
                    className={`like-button ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation when clicking the like button
                      handleLike(product.id);
                    }}
                  >
                    {likedProducts.includes(product.id) ? <FaHeart className='unlike-heart' /> : <FaRegHeart className='like-heart' />}
                  </button>
                </div>
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
      {popupMessage && (
        <div className="popup-like">
          <div className="success-text">
            {popupMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductRenderer;
