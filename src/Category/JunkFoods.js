import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';
import { useEffect } from 'react';

function JunkFoods () {
    const apiUrl = 'https://api-arshopper.ngrok.app/api/junkfoods/';

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
            <ProductRenderer categoryTitle="JUNK FOODS"/>
        </ProductFetcher>
    );
}

export default JunkFoods;