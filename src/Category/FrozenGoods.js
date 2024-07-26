import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';
import { useEffect } from 'react';

function FrozenGoods () {
  const apiUrl = 'https://api-arshopper.ngrok.app/api/frozengoods/'; // eto papalitan 

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
        <ProductRenderer categoryTitle="FROZEN GOODS" /> 
      </ProductFetcher>
    );
}

export default FrozenGoods;