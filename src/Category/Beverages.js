import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';
import React, {useEffect} from 'react';

function Beverages () {
  const apiUrl = 'https://localhost:8000/api/beverages/';

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
        <ProductRenderer categoryTitle="BEVERAGES" />
      </ProductFetcher>
    );
}

export default Beverages;