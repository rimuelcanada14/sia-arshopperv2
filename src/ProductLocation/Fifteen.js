import React from 'react';
import ModelFifteen from '../3DModels/ModelFifteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const FifteenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelFifteen />
      </div>
    </>
  );
};

export default FifteenLoc;
