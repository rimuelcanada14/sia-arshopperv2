import React from 'react';
import ModelFourteen from '../3DModels/ModelFourteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const FourteenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelFourteen />
      </div>
    </>
  );
};

export default FourteenLoc;
