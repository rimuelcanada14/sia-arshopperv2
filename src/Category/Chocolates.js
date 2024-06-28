// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function Chocolates () {
    const apiUrl = 'https://localhost:8000/api/chocolates/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="CHOCOLATES"/>
        </ProductFetcher>
    );
}

export default Chocolates;
