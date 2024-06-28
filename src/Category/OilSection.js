// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function OilSection () {
    const apiUrl = 'https://localhost:8000/api/oilsection/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="OIL SECTION"/>
        </ProductFetcher>
    );
}

export default OilSection;
