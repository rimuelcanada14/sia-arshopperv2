// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function CoffeeMilk () {
    const apiUrl = 'https://localhost:8000/api/coffeemilk/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="COFFEE/MILK"/>
        </ProductFetcher>
    );
}

export default CoffeeMilk;
