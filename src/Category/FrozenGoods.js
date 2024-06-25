// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
import './Beverages.css';
// import Header from '../components/header';
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