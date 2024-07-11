import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';
import { useEffect } from 'react';

function Pastry () {
    const apiUrl = 'https://localhost:8000/api/pastry/';

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
            <ProductRenderer categoryTitle="PASTRY"/>
        </ProductFetcher>
    );
}

export default Pastry;