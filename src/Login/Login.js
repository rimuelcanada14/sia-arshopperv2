import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUnlock } from 'react-icons/fa';
import { FaMobileRetro } from "react-icons/fa6";
import {Link, Outlet,} from 'react-router-dom';
import './Login.css';
import Header from '../components/header';

const InputLoginMobile = (props) => {
    return (
        <>
            <div className = "login-mobile">
                <FaMobileRetro className="login-icon-mobile" />
                <p className = "login-p-mobile">+63</p>
                <input autoComplete = "on" type = "number" placeholder ="9151234567" id='login-input-mobile' maxlength="10"></input>
            </div>
            
        </>
    )
}
const InputLoginPass = (props) => {
    return (
        <>  
            <div className = "login-pass">
                <FaUnlock className="login-icon-pass" />
                <input autoComplete = "on" type = "password" placeholder ="Password" id='login-input-pass'></input>
            </div>
            
        </>
    )
}

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
  }, []);

  return (
    <>
        <div className = "login-header">
            <Header />
        </div>
        
        <div className='login-page'>
            <h1 className = "login-title">LOG IN</h1>
            <div className = "login-container">
                <p className = "login-categories">Mobile Number</p>
                <InputLoginMobile />
                <p className = "login-categories">Password</p>
                <InputLoginPass />
                <p><Link to = "/signup" className = "login-forgot">Forgot Password</Link></p>
                <Link to ="/home" className = "login-submit">LOG IN</Link>
                <p>New User?<Link to ="/signup" className = "login-signup">Sign Up</Link></p>
                
            </div>
            
        </div>
      
    </>
    
  );
}

export default Login;