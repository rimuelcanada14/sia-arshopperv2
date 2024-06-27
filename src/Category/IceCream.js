import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function IceCream () {
  const apiUrl = 'https://localhost:8000/api/icecream/'; // eto papalitan 

  return (
      <ProductFetcher apiUrl={apiUrl}> 
        <ProductRenderer categoryTitle="Ice Cream" /> 
      </ProductFetcher>
    );
}

export default IceCream;