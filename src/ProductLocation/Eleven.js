import ModelEleven from '../3DModels/ModelEleven';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const ElevenLoc = () => {

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
    <>
      <div>
        <Header header={<Link to ="/category" className="products-back">BACK</Link>} headersub="&nbsp;" headerright="LOCATION" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelEleven />
      </div>
    </>
  );
};

export default ElevenLoc;
