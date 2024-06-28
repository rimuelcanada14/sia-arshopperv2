// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function PartyUtensils () {
    const apiUrl = 'https://localhost:8000/api/partyutensils/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="PARTY UTENSILS"/>
        </ProductFetcher>
    );
}

export default PartyUtensils;
