import React, { useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function Water () {
    const apiUrl = 'https://api-arshopper.ngrok.app/api/water/';

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="WATER"/>
        </ProductFetcher>
    );
}

export default Water;