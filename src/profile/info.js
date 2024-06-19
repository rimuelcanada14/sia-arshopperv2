import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Modal from './Modal';

function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile_number: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
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
            mobile_number: response.data.mobile_number,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          });
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
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
      const response = await axios.put(`https://192.168.100.90:8000/api/user-details/${user.mobile_number}/`, formData);
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
    try {
      const response = await axios.post(`https://192.168.100.90:8000/api/change-password/${user.mobile_number}/`, {
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
      console.error('Failed to change password', error);
      setError(error);
    }
  };

  return (
    <>
      <Header header="INFORMATION" headerright="ICHI MART" headersub="©" className='profile-header' />
      <img className='profile-icon' src='ProfileImage/profile.png' alt='profileimage'></img>
      {user && <h1 className="profile-name">{user.firstName} {user.lastName}</h1>}
      <div className='profile-container'>
        <div className='info-btn'>
          <h1 className='info-title'>CHANGE INFORMATION</h1>
          {user && <h4 className='info-categories'>FIRST NAME: {user.firstName}</h4>}
          {user && <h4 className='info-categories'>LAST NAME: {user.lastName}</h4>}
          {user && <h4 className='info-categories1'>MOBILE NUMBER: {user.mobile_number}</h4>}
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
          <div>
            <label>Mobile Number</label>
            <p className='modal-num'>+63</p>
            <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} id='edit-input-num'/>
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
          <button type="submit" className='modal-submit'>SAVE</button>
        </form>
      </Modal>
      <Footer className='profile-footer' />
    </>
  );
}

export default ProfileInfo;
