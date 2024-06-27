import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function FrozenGoods () {
  const apiUrl = 'https://localhost:8000/api/frozengoods/'; // eto papalitan 

  return (
      <ProductFetcher apiUrl={apiUrl}> 
        <ProductRenderer categoryTitle="Frozen Goods" /> 
      </ProductFetcher>
    );
}

export default FrozenGoods;