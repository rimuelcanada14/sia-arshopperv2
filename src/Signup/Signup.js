import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUser, FaLock, FaLockOpen } from "react-icons/fa6";
import { FcApproval } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from '../components/header';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    mobile_number: '',
    healthComplication: 'no',
    illness: 'null',
    illness2: 'null2',
    illness3: 'null3',
  });

  const [passErr, setPassError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const Redirection = useNavigate('');
  const [mobileErr, setMobileError] = useState('');
  const [duplicateMobileError, setDuplicateMobileError] = useState('');
  const [showIllness2, setShowIllness2] = useState(false);
  const [showIllness3, setShowIllness3] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    if (name === 'firstName' || name === 'lastName') {
      updatedValue = value.replace(/[^A-Za-zÑñ]/ig, '');
      updatedValue = updatedValue.toUpperCase();
    }
  
    // Handle healthComplication change
    if (name === 'healthComplication' && value === 'no') {
      setFormData({
        ...formData,
        [name]: value,
        illness: 'null',
        illness2: 'null2',
        illness3: 'null3',
      });
      setShowIllness2(false);
      setShowIllness3(false);
    } else {
      setFormData({ ...formData, [name]: updatedValue });
    }
  
    if (name === 'password' || name === 'confirmPassword') {
      setPassError('');
    } else if (name === 'mobile_number') {
      if (!value.startsWith('9') || value.length !== 10) {
        setMobileError('Invalid Mobile Number');
      } else {
        setMobileError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uppercaseFormData = {
      ...formData,
      firstName: formData.firstName.toUpperCase(),
      lastName: formData.lastName.toUpperCase(),
    };

    if (uppercaseFormData.password !== uppercaseFormData.confirmPassword) {
      setPassError('Passwords do not match');
      setMobileError('');
      return;
    } else if (!uppercaseFormData.mobile_number.startsWith('9') || uppercaseFormData.mobile_number.length !== 10) {
      setMobileError('Invalid Mobile Number');
      setPassError('');
      return;
    } else if (uppercaseFormData.healthComplication === 'yes' && uppercaseFormData.illness === 'null') {
      setPassError('Select a Complication');
      setMobileError('');
      return;
    } else if (
      uppercaseFormData.illness === uppercaseFormData.illness2 ||
      uppercaseFormData.illness === uppercaseFormData.illness3 ||
      uppercaseFormData.illness2 === uppercaseFormData.illness3
    ) {
      setPassError('Duplicate Complication');
      setMobileError('');
      return;
    }

    try {
      const response = await axios.post('https://192.168.1.46:8000/api/signup/', uppercaseFormData);
      if (response.status === 201) {
        console.log('User signed up successfully!');
        setSuccessMessage('Sign up Successful!');

        setTimeout(() => {
          Redirection('/');
        }, 2000);
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Mobile number exists');
        setDuplicateMobileError('Mobile number exists');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPassError('');
      setMobileError('');
      setDuplicateMobileError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [passErr, mobileErr, duplicateMobileError]);

  const InputLimiter = (e) => {
    const { name, value } = e.target;
    if (value.length <= 10) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addIllness2 = () => {
    setShowIllness2(true);
  };

  const addIllness3 = () => {
    setShowIllness3(true);
  };

  const removeIllness2 = () => {
    setFormData({ ...formData, illness2: 'null2' });
    setShowIllness2(false);
  };

  const removeIllness3 = () => {
    setFormData({ ...formData, illness3: 'null3' });
    setShowIllness3(false);
  };

  const showIllnessContainer = formData.healthComplication === 'yes';

  return (
    <div>
      <div className='signup-header'>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div className='signup-page'>
        <h1 className="signup-title">SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <div className="signup-container">
            <p className="signup-categories">First Name</p>
            <div className="signup-user">
              <FaUser className="signup-icon-user" />
              <input
                id="signup-input-user"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input-uppercase"
              />
            </div>

            <p className="signup-categories">Last Name</p>
            <div className="signup-user">
              <FaUser className="signup-icon-user" />
              <input
                id="signup-input-user"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input-uppercase"
              />
            </div>

            <p className="signup-categories">Mobile Number</p>
            <div className="signup-mobile">
              <FaMobileRetro className="signup-icon-mobile" />
              <p className="signup-p-mobile">+63</p>
              <input
                id="signup-input-mobile"
                type="number"
                name="mobile_number"
                placeholder="Mobile Number"
                maxLength="10"
                pattern="9[0-9]{9}"
                value={formData.mobile_number}
                onChange={InputLimiter}
                required
              />
            </div>

            <p className="signup-categories">Create Password</p>
            <div className="signup-pass">
              <FaLock className="signup-icon-mobile" />
              <input
                id="signup-input-user"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <p className="signup-categories">Confirm Password</p>
            <div className="signup-pass">
              <FaLockOpen className="signup-icon-mobile" />
              <input
                id="signup-input-user"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            </div>

            <p className="signup-categories">Health Complications</p>
            <div className="signup-health">
              <select
                name="healthComplication"
                id="signup-input-health"
                onChange={handleChange}
                value={formData.healthComplication}
              >
                <option value="yes">I Have Health Complications</option>
                <option value="no">I Don't Have Health Complications</option>
              </select>
            </div>

            <p>Already have an account?<Link to="/" className="signup-login">Login</Link></p>
          </div>

          {showIllnessContainer && (
            <div className="illness-container">
              <p className="illness-categories">Enter Health Complication</p>
              <div className="illness-health">
                <select
                  name="illness"
                  id="illness-input-health"
                  onChange={handleChange}
                  value={formData.illness}
                >
                  <option value="kidney diseases">Kidney Diseases</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="uti">Urinary Tract Infection</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="skin">Skin Diseases</option>
                  <option value="gastrointestinal">Gastrointestinal Diseases</option>
                  <option value="liver diseases">Liver Diseases</option>
                  <option value="null" hidden></option>
                </select>
              </div>

              {showIllness2 && (
                <>
                  <p className="illness-categories">Enter Health Complication 2</p>
                  <div className="illness-health">
                    <select
                      name="illness2"
                      id="illness-input-health"
                      onChange={handleChange}
                      value={formData.illness2}
                    >
                     <option value="kidney diseases">Kidney Diseases</option>
                     <option value="hypertension">Hypertension</option>
                     <option value="uti">Urinary Tract Infection</option>
                     <option value="diabetes">Diabetes</option>
                     <option value="skin">Skin Diseases</option>
                     <option value="gastrointestinal">Gastrointestinal Diseases</option>
                     <option value="liver diseases">Liver Diseases</option>
                      <option value="null2" hidden></option>
                    </select>
                  </div>
                  <button type="button" onClick={removeIllness2} className="illness-button remove-button">Remove Illness 2</button>
                </>
              )}

              {showIllness3 && (
                <>
                  <p className="illness-categories">Enter Health Complication 3</p>
                  <div className="illness-health">
                    <select
                      name="illness3"
                      id="illness-input-health3"
                      onChange={handleChange}
                      value={formData.illness3}
                    >
                      <option value="kidney diseases">Kidney Diseases</option>
                      <option value="hypertension">Hypertension</option>
                      <option value="uti">Urinary Tract Infection</option>
                      <option value="diabetes">Diabetes</option>
                      <option value="skin">Skin Diseases</option>
                      <option value="gastrointestinal">Gastrointestinal Diseases</option>
                      <option value="liver diseases">Liver Diseases</option>
                      <option value="null3" hidden></option>
                    </select>
                  </div>
                  <button type="button" onClick={removeIllness3} className="illness-button remove-button">Remove Illness 3</button>
                </>
              )}

              {showIllnessContainer && !showIllness2 && formData.illness !== 'null' && (
                <button type="button" onClick={addIllness2} className="illness-button">Add Another Illness</button>
              )}
              {showIllnessContainer && showIllness2 && !showIllness3 && formData.illness2 !== 'null2' && (
                <button type="button" onClick={addIllness3} className="illness-button">Add Another Illness</button>
              )}
            </div>
          )}

          <div className='signup-low'>
            {mobileErr &&
              <div className="popup">
                <RxCrossCircled className='ekis' />
                <div className="popup-text">
                  {mobileErr}
                </div>
                <RxCrossCircled className='ekisR' />
              </div>}

            {duplicateMobileError &&
              <div className="popup">
                <RxCrossCircled className='ekis-pass' />
                <div className="popup-text">
                  {duplicateMobileError}
                </div>
                <RxCrossCircled className='ekis-passR' />
              </div>}

            {passErr &&
              <div className="popup">
                <RxCrossCircled className='ekis-pass' />
                <div className="popup-text">
                  {passErr}
                </div>
                <RxCrossCircled className='ekis-passR' />
              </div>}

            {successMessage &&
              <div className="popup-success">
                <FcApproval className="signup-check" />
                <div className="success-text">
                  {successMessage}
                </div>
                <FcApproval className="signup-checkR" />
              </div>}

            <button type="submit" className="signup-submit">SIGN UP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
