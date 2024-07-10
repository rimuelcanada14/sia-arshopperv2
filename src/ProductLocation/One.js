import React from 'react';
import ModelOne from '../3DModels/ModelOne';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const OneLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className = "way-legend">LEGEND:</h1>
        <Legend />
        <ModelOne />
      </div>
    </>
    
  );
};

export default OneLoc;
