// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function LiquorWines () {
    const apiUrl = 'https://localhost:8000/api/liquorwines/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="LIQUOR/WINES"/>
        </ProductFetcher>
    );
}

export default LiquorWines;
