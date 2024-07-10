import React from 'react';
import ModelSix from '../3DModels/ModelSix';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const SixLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelSix />
      </div>
    </>
  );
};

export default SixLoc;
