// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function BreadSpread () {
    const apiUrl = 'https://localhost:8000/api/breadspread/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="BREAD SPREAD"/>
        </ProductFetcher>
    );
}

export default BreadSpread;
