// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMobileRetro, FaUnlockKeyhole } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../components/header';
import { TypeAnimation } from 'react-type-animation';
import { RxCrossCircled } from "react-icons/rx";
import { useAuth } from '../AuthContext';

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [credErr, setCredErr] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                mobile_number: parseInt(mobileNumber, 10),
                password: password
            };
            const response = await axios.post(`https://192.168.100.90:8000/api/login/`, requestData);  // Change URL to localhost for development
            const token = response.data.token;
            login(token);
            setError(null);

            // Store mobile number in local storage
            localStorage.setItem('mobileNumber', mobileNumber);

            navigate('/home');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setError('Invalid');
            setCredErr('Invalid Credentials');
        }
    };

    const inputLimiter = (e) => {
        const value = e.target.value;
        if (value.length <= 10){
            setMobileNumber(value);
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
                <h1 className="login-title">LOG IN</h1>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <div className="login-user">
                            <p className="login-categories">Mobile Number</p>
                            <p className="login-p-mobile">+63</p>
                            <input type="number" id="login-input-mobile" value={mobileNumber} onChange={inputLimiter}/>
                            <FaMobileRetro className="login-icon-mobile" />
                        </div>
                        
                        <div className="login-user">
                            <p className="login-categories">Password</p>
                            <input type="password" id="login-input-pass" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaUnlockKeyhole className="login-icon-pass" />
                        </div>
                        
                        {/* <p><Link to="/signup" className="login-forgot">Forgot Password</Link></p> */}
                        <button type="submit" className="login-submit">LOG IN</button>
                        <p>New User? <Link to="/signup" className="login-signup">Sign Up</Link></p>
                    </form>
                </div>

                <div className="login-type">
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
                    </div>
                }
            </div>
        </>
    );
};

export default Login;

                           
