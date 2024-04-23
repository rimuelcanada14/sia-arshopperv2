import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUser, FaLock, FaLockOpen, FaNotesMedical  } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import './Signup.css';
import Header from '../components/header';

const InputSignupFName = (props) => {
  return (
      <>
          <div className = "signup-user">
              <FaUser className="signup-icon-user" />
              <input autoComplete = "on" type = "text" placeholder ="First Name" id='signup-input-user'></input>
          </div>
          
      </>
  )
}
const InputSignupLName = (props) => {
  return (
      <>
          <div className = "signup-user">
              <FaUser className="signup-icon-user" />
              <input autoComplete = "on" type = "text" placeholder ="Last name" id='signup-input-user'></input>
          </div>
          
      </>
  )
}
const InputSignupMobile = (props) => {
    return (
        <>
            <div className = "signup-mobile">
                <FaMobileRetro className="signup-icon-mobile" />
                <p className = "signup-p-mobile">+63</p>
                <input autoComplete = "on" type = "number" placeholder ="9151234567" id='signup-input-mobile' maxlength="10"></input>
            </div>
            
        </>
    )
}
const InputSignupCrPass = (props) => {
    return (
        <>  
            <div className = "signup-pass">
                <FaLock className="signup-icon-pass" />
                <input type = "password" placeholder ="Create Password" id='signup-input-pass'></input>
            </div>
            
        </>
    )
}
const InputSignupCoPass = (props) => {
  return (
      <>  
          <div className = "signup-pass">
              <FaLockOpen className="signup-icon-pass" />
              <input type = "password" placeholder ="Confirm Password" id='signup-input-pass'></input>
          </div>
          
      </>
  )
}
const InputSignupHealth = (props) => {
  return (
    <>
      <div className="signup-health">
        <FaNotesMedical className="signup-icon-health" />
        <select id="signup-input-health">
          <option value="strong">I have health complication/s</option>
          <option value="medium">I do not have health complications</option>
        </select>
      </div>
    </>
  );
};

function Login() {
  const [setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setMessage]);

  return (
    <>
        <div className='signup-header'>
            <Header header="ARShopper"/>
        </div>
        
        <div className='signup-page'>
            <h1 className = "signup-title">SIGN UP</h1>
            <div className = "signup-container">
                <p className = "signup-categories">First Name</p>
                <InputSignupFName />
                <p className = "signup-categories">Last Name</p>
                <InputSignupLName />
                <p className = "signup-categories">Mobile Number</p>
                <InputSignupMobile />
                <p className = "signup-categories">Create Password</p>
                <InputSignupCrPass />
                <p className = "signup-categories">Confirm Password</p>
                <InputSignupCoPass />
                <p className = "signup-categories">Password</p>
                <InputSignupHealth />
            </div>

            <div className='signup-low'>
                <Link to ="/home" className = "signup-submit">SUBMIT</Link>
                <p>Already have an account?<Link to ="/" className = "signup-login">Login</Link></p>
            </div>
        </div>
      
    </>
    
  );
}

export default Login;