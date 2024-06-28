// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Beverages.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function NoodlesPasta () {
    const apiUrl = 'https://localhost:8000/api/noodlespasta/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="NOODLES/PASTA"/>
        </ProductFetcher>
    );
}

export default NoodlesPasta;