import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { LuScanLine } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";

function Home() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const mobileNumber = localStorage.getItem('mobileNumber');
        if (mobileNumber) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`https://localhost:8000/api/user-details/${mobileNumber}/`);
                    setUser(response.data);
                    setShowPopup(true); // Show popup when user details are fetched successfully
                    setTimeout(() => {
                        setShowPopup(false); // Hide popup after 2 seconds
                    }, 2000);
                } catch (error) {
                    console.error('Failed to fetch user details', error);
                    setError(error);
                }
            };
            fetchUserDetails();
        }
    }, []);

    return (
        <>
            <div>
                <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
            </div>

            <div>
                <div className='home-container'>
                    <Link to ="/barcodescan">
                        <div className='home-icon'>
                            <LuScanLine className="icon"/>
                            <h1 className='home-categories'>SCAN</h1>
                        </div>
                    </Link>
                    
                    <Link to ="/category">
                        <div className='home-icon'>
                            <ImSearch className="icon" />
                            <h1 className='home-categories'>SEARCH</h1>
                        </div>
                    </Link>

                    <Link to ="/aboutUs">
                        <div className='home-icon'>
                            <FaPeopleGroup className="icon" />
                            <h1 className='home-categories'>ABOUT US</h1>
                        </div>
                    </Link>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            
            {/* Popup */}
            {showPopup && (
                <div className="popup-success">
                    <FcApproval className="signup-check" />
                      <div className="success-text">
                        {user && <p>Welcome, {user.firstName}!</p>}
                      </div>
                    <FcApproval className="signup-checkR" />
                </div>
            )}
            {error && <p>Failed to load user details: {error.message}</p>}
        </>
    );
}

export default Home;
