import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function Pastry () {
    const apiUrl = 'https://localhost:8000/api/pastry/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="Pastry"/>
        </ProductFetcher>
    );
}

export default Pastry;