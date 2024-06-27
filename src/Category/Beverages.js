import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function Beverages () {
  const apiUrl = 'https://192.168.100.90:8000/api/beverages/';

  return (
      <ProductFetcher apiUrl={apiUrl}>
        <ProductRenderer categoryTitle="BEVERAGES" />
      </ProductFetcher>
    );
}

export default Beverages;