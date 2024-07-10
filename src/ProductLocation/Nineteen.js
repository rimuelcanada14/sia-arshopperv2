import React from 'react';
import ModelNineteen from '../3DModels/ModelNineteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const NineteenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelNineteen />
      </div>
    </>
  );
};

export default NineteenLoc;
