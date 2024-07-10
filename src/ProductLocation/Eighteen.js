import React from 'react';
import ModelEighteen from '../3DModels/ModelEighteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const EighteenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelEighteen />
      </div>
    </>
  );
};

export default EighteenLoc;
