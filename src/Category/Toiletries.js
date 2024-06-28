// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function Toiletries () {
    const apiUrl = 'https://localhost:8000/api/toiletries/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="TOILETRIES"/>
        </ProductFetcher>
    );
}

export default Toiletries;
