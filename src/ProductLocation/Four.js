import React from 'react';
import ModelFour from '../3DModels/ModelFour';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const FourLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelFour />
      </div>
    </>
  );
};

export default FourLoc;
