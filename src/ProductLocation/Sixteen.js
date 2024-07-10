import React from 'react';
import ModelSixteen from '../3DModels/ModelSixteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const SixteenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelSixteen />
      </div>
    </>
  );
};

export default SixteenLoc;
