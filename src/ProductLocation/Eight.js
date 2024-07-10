import React from 'react';
import ModelEight from '../3DModels/ModelEight';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const EightLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelEight />
      </div>
    </>
  );
};

export default EightLoc;
