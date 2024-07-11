import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Modal from './ProfileModal';
import { FcApproval } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';


function ProfileHealth() {
  const [user, setUser] = useState(null);
  const [setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    illness: 'null',
    illness2: 'null2',
    illness3: 'null3'
  });
  const [duplicateIllnessError, setDuplicateIllnessError] = useState('');
  const illnessOptions = {
    null: "NONE",
    respiratory: "Respiratory Infections",
    hypertension: "Hypertension",
    uti: "Urinary Tract Infection",
    diabetes: "Diabetes",
    skin: "Skin Diseases",
    pneumonia: "Pneumonia",
    diarrhea: "Diarrhea"
  };

  useEffect(() => {
    const mobileNumber = localStorage.getItem('mobileNumber');
    if (mobileNumber) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`https://localhost:8000/api/user-details/${mobileNumber}/`);
          const userData = response.data;
          setUser(userData);
          setFormData({
            illness: userData.illness,
            illness2: userData.illness2,
            illness3: userData.illness3
          });
        } catch (error) {
          console.error('Failed to fetch user details', error);
          setError(error);
        }
      };
      fetchUserDetails();
    }
  }, [setError]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setDuplicateIllnessError('');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      illness: user.illness,
      illness2: user.illness2,
      illness3: user.illness3
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.illness === formData.illness2 || formData.illness === formData.illness3 || formData.illness2 === formData.illness3) {
      setDuplicateIllnessError('Duplicate illness found!');
      return;
    }
    try {
      const response = await axios.put(`https://localhost:8000/api/user-details/${user.mobile_number}/`, {
        illness: formData.illness,
        illness2: formData.illness2,
        illness3: formData.illness3
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

  return (
    <>
      <Header header={<Link to ="/profile" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="HEALTH STATUS" />
      <img className='profile-icon' src='ProfileImage/profile.png' alt='profileimage'></img>
      {user && <h1 className="profile-name">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</h1>}
      <div className='profile-container'>
        <div className='info-btn'>
          <h1 className='info-title'>HEALTH STATUS</h1>
          {user && user.illness === 'null' && user.illness2 === 'null2' && user.illness3 === 'null3' && <h4 className='health-categories'>NO HEALTH COMPLICATION WAS SET</h4>}
          {user && user.illness !== 'null' && <h4 className='health-categories'>HEALTH COMPLICATION: <br/> {illnessOptions[user.illness].toUpperCase()} </h4>}
          {user && user.illness2 !== 'null2' && <h4 className='health-categories'>HEALTH COMPLICATION: <br/> {illnessOptions[user.illness2].toUpperCase()} </h4>}
          {user && user.illness3 !== 'null3' && <h4 className='health-categories'>HEALTH COMPLICATION: <br/> {illnessOptions[user.illness3].toUpperCase()}</h4>}
          <button onClick={handleEditClick} className="info-edit">EDIT HEALTH STATUS</button>
        </div>
      </div>

      <Modal show={isEditing} onClose={handleCancelClick}>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>EDIT<br/>INFORMATION</h1>
            <label>Health Complication 1</label>
            <select name="illness" value={formData.illness} onChange={handleInputChange}>
                  <option value="respiratory">Respiratory Infections</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="uti">Urinary Tract Infection</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="skin">Skin Diseases</option>
                  <option value="pneumonia">Pneumonia</option>
                  <option value="diarrhea">Diarrhea</option>
                  <option value="null">NONE</option>
            </select>

            <label>Health Complication 2</label>
            <select name="illness2" value={formData.illness2} onChange={handleInputChange}>
                  <option value="respiratory">Respiratory Infections</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="uti">Urinary Tract Infection</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="skin">Skin Diseases</option>
                  <option value="pneumonia">Pneumonia</option>
                  <option value="diarrhea">Diarrhea</option>
                  <option value="null2">NONE</option>
            </select>

            <label>Health Complication 3</label>
            <select name="illness3" value={formData.illness3} onChange={handleInputChange}>
                  <option value="respiratory">Respiratory Infections</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="uti">Urinary Tract Infection</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="skin">Skin Diseases</option>
                  <option value="pneumonia">Pneumonia</option>
                  <option value="diarrhea">Diarrhea</option>
                  <option value="null3">NONE</option>
            </select>

          </div>
          <button type="submit" className='modal-submit'>SAVE</button>
        </form>
      </Modal>

      {showPopup && 
        <div className="info-popup-success">
          <FcApproval className="info-check" />
          <div>
            Changes saved!
          </div>
          <FcApproval className="info-checkR" />
        </div>}

      {duplicateIllnessError && 
        <div className="info-popup">
          <RxCrossCircled className='info-ekis-pass' />
            <div className ='popup-text'>
              {duplicateIllnessError}
            </div>
          <RxCrossCircled className='info-ekis-passR' />
        </div>}

      <Footer className='profile-footer' />
    </>
  );
}

export default ProfileHealth;
