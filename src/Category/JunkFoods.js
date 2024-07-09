import './Products.css';
import ProductFetcher from '../components/ProductFetcher';
import ProductRenderer from '../components/ProductRenderer';

function JunkFoods () {
    const apiUrl = 'https://192.168.100.7:8000/api/junkfoods/';

    return (
        <ProductFetcher apiUrl={apiUrl}>
            <ProductRenderer categoryTitle="JUNK FOODS"/>
        </ProductFetcher>
    );
}

export default JunkFoods;