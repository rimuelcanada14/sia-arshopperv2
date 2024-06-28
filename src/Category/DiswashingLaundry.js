// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function DiswashingLaundry () {
    const apiUrl = 'https://localhost:8000/api/diswashinglaundry/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="DISWASHING/LAUNDRY"/>
        </ProductFetcher>
    );
}

export default DiswashingLaundry;
