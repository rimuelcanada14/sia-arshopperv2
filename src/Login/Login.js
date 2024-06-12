import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUnlockKeyhole } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';
import Header from '../components/header';
import { TypeAnimation } from 'react-type-animation';
import { RxCrossCircled } from "react-icons/rx"


const Login = () => {
    const[mobile_Number, setMobile_Number] = useState('');
    const[password, setpassword] = useState('');
    const[setToken] = useState(null);
    const[setError] = useState(null);
    const redirect = useNavigate();
    const[credErr, setCredErr] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                mobile_number: parseInt(mobile_Number, 10),  // Ensure the mobile number is an integer
                password: password
            };
            console.log('Request Data:', requestData);  // Log the request data for debugging
            const response = await axios.post('http://localhost:8000/api/login/', requestData);
            setToken(response.data.token);
            setError(null);
            redirect('/Home');
        } catch (error) {
            console.error('Error:', error.response.data);  // Log the error response for debugging
            setError('Invalid credentials');
            setCredErr('Invalid Credentials');
            setToken(null);
        }
    };

    const Inputlimiter = (e) => {
        const value = e.target.value;
        if (value.length <= 10){
            setMobile_Number(value);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setCredErr('');
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [credErr]);
        
  return (
    <>
        <div>
            <Header header="ARShopper" headerright="ICHI MART" headersub="©"/>
        </div>
        
        <div className='login-page'>
            <h1 className = "login-title">LOG IN</h1>
            <div className = "login-container">
                <form onSubmit={handleSubmit}>
                    <div className = "login-user">
                        <p className = "login-categories">Mobile Number</p>
                        <p className = "login-p-mobile">+63</p>
                        <input type="number" id="login-input-mobile" value={mobile_Number} onChange={Inputlimiter}/>
                        <FaMobileRetro className="login-icon-mobile" />
                    </div>
                    
                    <div className = "login-user">
                        <p className = "login-categories">Password</p>
                        <input type="password" id = "login-input-pass" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <FaUnlockKeyhole className="login-icon-pass" />
                    </div>
                    
                    
                    <p><Link to = "/signup" className = "login-forgot">Forgot Password</Link></p>
                    <button type="submit" className = "login-submit">LOG IN</button>
                    <p>New User?<Link to ="/signup" className = "login-signup">Sign Up</Link></p>
                </form>
            </div>

            <div className = "login-type">
            <TypeAnimation
                sequence={[
                    'I love you', 3000, 
                    '愛してる', 3000,
                    'Mahal kita', 3000,
                    '사랑해요', 3000,
                    'Te quiero', 3000,
                    'أحبك', 3000,
                    'я тебе люблю', 3000,
                    "Je t'aime", 3000, 
                    'Σε αγαπώ', 3000,
                    'Jag älskar dig', 3000,
                    'Ti amo', 3000,
                ]}
                wrapper="span"
                speed={300}
                repeat={Infinity}
                />
            </div>

            {credErr && 
            <div className="popup">
                <RxCrossCircled className='ekis-pass'/>
                  <div className="popup-text">
                    {credErr}
                  </div>
                <RxCrossCircled className='ekis-passR'/>
            </div>}
        </div>
    </>
  );
}
export default Login;