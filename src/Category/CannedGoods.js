// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function CannedGoods () {
    const apiUrl = 'https://localhost:8000/api/cannedgoods/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="CANNED GOODS"/>
        </ProductFetcher>
    );
}

export default CannedGoods;
