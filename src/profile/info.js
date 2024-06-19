import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Modal from './Modal'; // Import the Modal component

function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile_number: ''
  });

  useEffect(() => {
      const mobileNumber = localStorage.getItem('mobileNumber');
      if (mobileNumber) {
          const fetchUserDetails = async () => {
              try {
                  const response = await axios.get(`https://192.168.100.90:8000/api/user-details/${mobileNumber}/`);
                  setUser(response.data);
                  setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    mobile_number: response.data.mobile_number
                  });
                  setShowPopup(true); // Show popup when user details are fetched successfully
                  setTimeout(() => {
                      setShowPopup(false); // Hide popup after 2 seconds
                  }, 2000);
              } catch (error) {
                  console.error('Failed to fetch user details', error);
                  setError(error);
              }
          };
          fetchUserDetails();
      }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile_number: user.mobile_number
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://192.168.1.144:8000/api/user-details/${user.mobile_number}/`, formData);
      console.log('Response:', response);
      setUser(response.data);
      setIsEditing(false);
      setShowPopup(true); // Show popup when user details are updated successfully
      setTimeout(() => {
          setShowPopup(false); // Hide popup after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Failed to update user details', error);
      setError(error);
    }
  };

  return (
    <>
      {/* header */}
      <Header header="INFORMATION" headerright="ICHI MART" headersub="©" className='profile-header' />

      {/* content */}
      <img className='profile-icon' src='ProfileImage/profile.png' alt='profileimage'></img>
      {user && <h1 className="profile-name">{user.firstName} {user.lastName}</h1>}

      <div className='profile-container'>
        <div className='info-btn'>
            <h1 className='info-title'>CHANGE INFORMATION</h1>
            {user && <h4 className='info-categories'>FIRST NAME: {user.firstName}</h4>}
            {user && <h4 className='info-categories'>LAST NAME: {user.lastName}</h4>}
            {user && <h4 className='info-categories1'>MOBILE NUMBER: {user.mobile_number}</h4>}
            <button onClick={handleEditClick} className="info-edit">EDIT</button>
        </div>
      </div>

      {/* Modal for editing */}
      <Modal show={isEditing} onClose={handleCancelClick}>
        <form onSubmit={handleSubmit} className='edit-form'>
            <h1 className="modal-title">EDIT INFORMATION</h1>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className = "edit-input"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className = "edit-input"
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleInputChange}
              id = "edit-input-num"
              maxLength={10}
            />
            <p className="modal-num">+63</p>
          </label>
          <div className='button-container'>
            <button type="submit" className='modal-submit'>SAVE</button>
          </div>
          
        </form>
      </Modal>

      {/* footer */}
      <Footer />
    </>
  )
}

export default ProfileInfo;
