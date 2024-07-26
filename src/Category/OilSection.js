import React, { useEffect } from 'react';
// import axios from 'axios';
import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function OilSection () {
    const apiUrl = 'https://api-arshopper.ngrok.app/api/oilsection/';

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
            <ProductRenderer categoryTitle="OIL SECTION"/>
        </ProductFetcher>
    );
}

export default OilSection;
