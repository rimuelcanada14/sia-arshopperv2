import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function Beverages () {
  const apiUrl = 'https://localhost:8000/api/beverages/';

  return (
      <ProductFetcher apiUrl={apiUrl}>
        <ProductRenderer categoryTitle="BEVERAGES" />
      </ProductFetcher>
    );
}

export default Beverages;