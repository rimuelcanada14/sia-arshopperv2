import React from 'react';
import ModelFive from '../3DModels/ModelFive';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const FiveLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelFive />
      </div>
    </>
  );
};

export default FiveLoc;
