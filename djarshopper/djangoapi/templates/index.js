// src/HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
    const openUrl = () => {
        window.location.href = 'https://172.20.100.144:3000';
    };

    return (
        <div className="homepage">
            <header>
                <button onClick={openUrl}>Open Dashboard</button>
            </header>
            <main>
                <h1>Welcome to My Site</h1>
                <p>This is the home page.</p>
            </main>
        </div>
    );
};

export default HomePage;
