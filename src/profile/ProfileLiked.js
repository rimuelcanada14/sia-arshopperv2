import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ProfileLiked({ }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const mobileNumber = localStorage.getItem('mobileNumber');
        const response = await axios.get('https://192.168.100.7:8000/api/liked-products/', {
          params: {
            mobile_number: mobileNumber
          }
        });
        setLikedProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch liked products:', error);
      }
    };

    fetchLikedProducts();
  }, []);

  const handleLike = async (productId) => {
    const mobileNumber = localStorage.getItem('mobileNumber');
  
    try {
      const response = await axios.post(`https://192.168.100.7:8000/api/products/${productId}/like/`, {
        mobileNumber: mobileNumber,
      });
      if (response.status === 200) {
        // Check if productId is already in likedProducts
        const isLiked = likedProducts.some((product) => product.id === productId);
  
        // Update likedProducts based on like/unlike action
        if (isLiked) {
          const updatedLikedProducts = likedProducts.filter((product) => product.id !== productId);
          setLikedProducts(updatedLikedProducts);
        } else {
          const updatedLikedProducts = [...likedProducts, response.data]; // assuming response.data contains product info
          setLikedProducts(updatedLikedProducts);
        }
  
        setPopupMessage(response.data.message);
        setTimeout(() => {
          setPopupMessage('');
        }, 2000); // Clear popup message after 2 seconds
      }
    } catch (error) {
      console.error('Failed to like/unlike the product:', error);
      setPopupMessage('Failed to like/unlike the product');
      setTimeout(() => {
        setPopupMessage('');
      }, 2000); // Clear popup message after 2 seconds
    }
  };
  
  return (
    <div>
      <Header header={<Link to="/profile" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="PRODUCTS" />
      <div className='product-container'>
        {likedProducts.length === 0 ? (
          <div className="no-products-liked">
            <h2 className='nope'>NO PRODUCTS LIKED</h2><br/><h4>...yet</h4>
          </div>
        ) : (
          likedProducts.map((product, index) => (
            <div key={index}>
              <Link to={product.name}>
                <button className="product-buttons">
                  <img className="products-img" src={`https://192.168.100.7:8000${product.image}`} alt={product.name} />
                  <span className="products-label">{product.name}<br />PHP {product.price}</span>
                  <div className="like-container">
                    <button
                      className={`like-button ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation when clicking the like button
                        handleLike(product.id);
                      }}
                    >
                      {likedProducts.includes(product.id) ? <FaRegHeart className='like-heart' /> : <FaHeart className='unlike-heart' /> }
                    </button>
                  </div>
                </button>
              </Link>
            </div>
          ))
        )}
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

export default ProfileLiked;
