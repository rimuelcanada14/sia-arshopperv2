import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUser, FaLock, FaLockOpen, FaNotesMedical } from "react-icons/fa6";
import { FcApproval } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from '../components/header';
import { RxCrossCircled } from "react-icons/rx";

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
  const [showIllness2, setShowIllness2] = useState(false);
  const [showIllness3, setShowIllness3] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword') {
      setPassError('');
    }
    else if (name === 'mobile_number') {
      if (!value.startsWith('9') || value.length !== 10) {
        setMobileError('');
      } else {
        setMobileError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setPassError('Passwords do not match');
      setMobileError('');
      return;
    } else if (!formData.mobile_number.startsWith('9') || formData.mobile_number.length !== 10) {
      setMobileError('Invalid Mobile Number');
      setPassError('');
      return;
    } else if (formData.healthComplication === 'yes' && formData.illness === 'null') {
      setPassError('Select a Complication');
      setMobileError('');
      return;
    } else if (formData.illness === formData.illness2 || formData.illness === formData.illness3 || formData.illness2 === formData.illness3) {
      setPassError('Duplicate Complication');
      setMobileError('');
      return;
    }
  
    try {
      const response = await axios.post('https://localhost:8000/api/signup/', formData);
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
      console.error('Failed to sign up', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPassError('');
      setMobileError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [passErr, mobileErr]);

  const Inputlimiter = (e) => {
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
                onChange={Inputlimiter}
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
              <FaNotesMedical className="signup-icon-health" />
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
          
          {/* Conditionally render the illness container */}
          {showIllnessContainer && (
            <div className="illness-container">
              <p className="illness-categories">Enter Health Complication</p>
              <div className="illness-health">
                <FaNotesMedical className="illness-icon-health" />
                <select
                  name="illness"
                  id="illness-input-health"
                  onChange={handleChange}
                  value={formData.illness}
                >
                  <option value="respiratory">Respiratory Infections</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="uti">Urinary Tract Infection</option>
                  <option value="animal">Animal Bites</option>
                  <option value="skin">Skin Diseases</option>
                  <option value="pneumonia">Pneumonia</option>
                  <option value="diarrhea">Diarrhea</option>
                  <option value="null" hidden></option>
                </select>
              </div>

              {/* Additional illness fields */}
              {showIllness2 && (
                <>
                  <p className="illness-categories">Enter Health Complication 2</p>
                    <div className="illness-health">
                      <FaNotesMedical className="illness-icon-health" />
                      <select
                        name="illness2"
                        id="illness-input-health"
                        onChange={handleChange}
                        value={formData.illness2}
                      >
                        <option value="respiratory">Respiratory Infections</option>
                        <option value="hypertension">Hypertension</option>
                        <option value="uti">Urinary Tract Infection</option>
                        <option value="animal">Animal Bites</option>
                        <option value="skin">Skin Diseases</option>
                        <option value="pneumonia">Pneumonia</option>
                        <option value="diarrhea">Diarrhea</option>
                        <option value="null2" hidden></option>
                      </select>
                    </div>
                </>
                        )}
              {showIllness3 && (
                <>
                  <p className="illness-categories">Enter Health Complication 3</p>
                    <div className="illness-health">
                      <FaNotesMedical className="illness-icon-health" />
                      <select
                        name="illness3"
                        id="illness-input-health"
                        onChange={handleChange}
                        value={formData.illness3}
                      >
                        <option value="respiratory">Respiratory Infections</option>
                        <option value="hypertension">Hypertension</option>
                        <option value="uti">Urinary Tract Infection</option>
                        <option value="animal">Animal Bites</option>
                        <option value="skin">Skin Diseases</option>
                        <option value="pneumonia">Pneumonia</option>
                        <option value="diarrhea">Diarrhea</option>
                        <option value="null3" hidden></option>
                      </select>
                    </div>
                </>
              )}
            
              {showIllnessContainer && !showIllness2 && (
                <button type="button" onClick={addIllness2} className="illness-button">Add Another Illness</button>
              )}
              {showIllnessContainer && showIllness2 && !showIllness3 && (
                <button type="button" onClick={addIllness3} className="illness-button">Add Another Illness</button>
              )}
            </div>
          )}

        {/* Error and success message components */}
        <div className='signup-low'>
          {mobileErr &&
            <div className="popup">
              <RxCrossCircled className='ekis' />
              <div className="popup-text">
                {mobileErr}
              </div>
              <RxCrossCircled className='ekisR' />
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
