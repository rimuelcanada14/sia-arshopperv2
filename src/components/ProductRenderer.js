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
        return '/1';
      case '2':
        return '/2';
      case '3':
        return '/3';
      case '4':
        return '/4';
      case '5':
        return '/5';
      case '6':
        return '/6';
      case '7':
        return '/7';
      case '8':
        return '/8';
      case '9':
        return '/9';
      case '10':
        return '/10';
      case '11':
        return '/11';
      case '12':
        return '/12';
      case '13':
        return '/13';
      case '14':
        return '/14';
      case '15':
        return '/15';
      case '16':
        return '/16';
      case '17':
        return '/17';
      case '18':
        return '/18';
      case '19':
        return '/19';
      case '20':
        return '/20';
      case '21':
        return '/21';
      case '22':
        return '/22';
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
