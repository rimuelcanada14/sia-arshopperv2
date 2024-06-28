import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function JunkFoods () {
    const apiUrl = 'https://localhost:8000/api/junkfoods/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="JUNK FOODS"/>
        </ProductFetcher>
    );
}

export default JunkFoods;