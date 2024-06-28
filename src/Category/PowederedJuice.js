// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function PowderedJuice () {
    const apiUrl = 'https://localhost:8000/api/powderedjuice/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="POWDERED JUICE"/>
        </ProductFetcher>
    );
}

export default PowderedJuice;