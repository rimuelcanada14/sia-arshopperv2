import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUser, FaLock, FaLockOpen, FaNotesMedical  } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import './Signup.css';
import Header from '../components/header';

//FOR BACK-END
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    healthComplication: '',
  });

  const [passErr, setPassError] = useState('');

  const handleChange = (e) => {
    const{name, value} = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword'){
      setPassError('');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      setPassError('Password do not match');
      return;
    }


    try {
      const response = await axios.post('http://localhost:8000/api/signup/', formData);
      if (response.status === 201) {
        console.log('User signed up successfully!');
        // Redirect to login page or perform other actions
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

//FOR FRONT-END
  return (
    <div>
      <div className='signup-header'>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©"/>
      </div>

      <div className='signup-page'>
        <h1 className = "signup-title">SIGN UP</h1>
          <form onSubmit={handleSubmit}>
            <div className = "signup-container">

              <p className = "signup-categories">First Name</p>
                <div className = "signup-user">
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

              <p className = "signup-categories">Last Name</p>
                <div className = "signup-user">
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

              <p className = "signup-categories">Mobile Number</p>
                <div className = "signup-mobile">
                  <FaMobileRetro className="signup-icon-mobile" />
                  <p className = "signup-p-mobile">+63</p>
                    <input
                      id="signup-input-mobile"
                      type="number"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                </div>
              
              <p className = "signup-categories">Create Password</p>
                <div className = "signup-pass">
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

              <p className = "signup-categories">Confirm Password</p>
                <div className = "signup-pass">
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
              
              <p className = "signup-categories">Health Complications</p>
                <div className = "signup-health">
                  <FaNotesMedical className="signup-icon-health" />
                  <select name="healthComplication" id="signup-input-health" onChange={handleChange} value={formData.healthComplication}>
                    <option value="yes">I Have Health Complications</option>
                    <option value ="no">I Don't Have Health Complications</option>
                  </select>
                </div>

              </div>
              

            <div className='signup-low'>
              {passErr && <div style={{color: 'red'}}>{passErr} </div>}
              <button type="submit" className = "signup-submit">SIGN UP</button>
              <p>Already have an account?<Link to ="/" className = "signup-login">Login</Link></p>
            </div>

          </form>
        </div>
      </div>

    
  );
}

export default Signup;