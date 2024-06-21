// ProductFetcher.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductFetcher({ apiUrl, children }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        console.log('Response from API:', response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error);
      });
  }, [apiUrl]);

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { products })
      )}
    </div>
  );
}

export default ProductFetcher;
