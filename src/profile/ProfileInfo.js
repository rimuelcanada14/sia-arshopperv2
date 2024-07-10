import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Modal from './ProfileModal';
import { FcApproval } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';

function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [incorrectCurrentPassword, setIncorrectCurrentPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    const mobileNumber = localStorage.getItem('mobileNumber');
    if (mobileNumber) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`https://localhost:8000/api/user-details/${mobileNumber}/`);
          const userData = response.data;
          setUser(userData);
          setFormData({
            firstName: userData.firstName.toUpperCase(),
            lastName: userData.lastName.toUpperCase(),
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          });
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
    let updatedValue;
  
    // Allowing only alphabetical characters for first name and last name
    if (name === "firstName" || name === "lastName") {
      updatedValue = value.replace(/[^A-Za-zÑñ]/ig, ''); // Allow only a-z and A-Z
    } else {
      updatedValue = value; // For other inputs, keep the original value
    }
  
    setFormData({ ...formData, [name]: updatedValue });
  };
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName.toUpperCase(),
      lastName: user.lastName.toUpperCase(),
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordCancelClick = () => {
    setIsChangingPassword(false);
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://localhost:8000/api/user-details/${user.mobile_number}/`, {
        firstName: formData.firstName.toUpperCase(),
        lastName: formData.lastName.toUpperCase(),
      });
      console.log('Response:', response);
      setUser(response.data);
      setIsEditing(false);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to update user details', error);
      setError(error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordMismatch(true);
      setTimeout(() => {
        setPasswordMismatch(false);
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(`https://localhost:8000/api/change-password/${user.mobile_number}/`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword
      });
      console.log('Response:', response);
      setIsChangingPassword(false);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIncorrectCurrentPassword(true);
        setTimeout(() => {
          setIncorrectCurrentPassword(false);
        }, 2000);
      } else {
        console.error('Failed to change password', error);
        setError(error);
      }
    }
  };

  return (
    <>
      <Header header={<Link to ="/profile" className="products-back">BACK</Link>} headerright="INFORMATION" />
      <img className='profile-icon' src='ProfileImage/profile.png' alt='profileimage'></img>
      {user && <h1 className="profile-name">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</h1>}
      <div className='profile-container'>
        <div className='info-btn'>
          <h1 className='info-title'>PERSONAL INFORMATION</h1>
          <div className="info-container">
            {user && <h4 className='info-categories'>FIRST NAME: &emsp; &emsp;&emsp;{user.firstName.toUpperCase()}</h4>}
            {user && <h4 className='info-categories'>LAST NAME: &emsp;&emsp;&emsp;&ensp;{user.lastName.toUpperCase()}</h4>}
            {user && <h4 className='info-categories1'>MOBILE NUMBER: &emsp;0{user.mobile_number}</h4>}
          </div>
          <button onClick={handleEditClick} className="info-edit">EDIT INFORMATION</button>
          <button onClick={handlePasswordChangeClick} className="info-pass">CHANGE PASSWORD</button>
        </div>
      </div>

      <Modal show={isEditing} onClose={handleCancelClick}>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>EDIT<br/>INFORMATION</h1>
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} id='edit-input'/>
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} id='edit-input'/>
          </div>
          <button type="submit" className='modal-submit'>SAVE</button>
        </form>
      </Modal>

      <Modal show={isChangingPassword} onClose={handlePasswordCancelClick}>
        <form onSubmit={handlePasswordSubmit}>
          <div>
            <h1>CHANGE<br/>PASSWORD</h1>
            <label>Current Password</label>
            <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} id="edit-input-pass" />
          </div>
          <div>
            <label>New Password</label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} id="edit-input-pass"/>
          </div>
          <div>
            <label>Confirm New Password</label>
            <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleInputChange} />
          </div>
          <div className="modal-button-save">
            <button type="submit" className='modal-submit'>SAVE</button>
          </div>
          
        </form>
      </Modal>
      

      {passwordMismatch && 
        <div className="info-popup">
          <RxCrossCircled className='info-ekis-pass' />
          <div className='popup-text'>
            Passwords do not match
          </div>
          <RxCrossCircled className='info-ekis-passR' />
        </div>}

      {incorrectCurrentPassword && 
        <div className="info-popup">
          <RxCrossCircled className='info-ekis-pass' />
          <div className ='popup-text'>
            Incorrect Current Password
          </div>
          <RxCrossCircled className='info-ekis-passR' />
        </div>}

      {showPopup && 
        <div className="info-popup-success">
          <FcApproval className="info-check" />
          <div>
            Changes saved!
          </div>
          <FcApproval className="info-checkR" />
        </div>}
      <Footer className='profile-footer' />
    </>
  );
}

export default ProfileInfo;
