import React from 'react';
import ModelNine from '../3DModels/ModelNine';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const NineLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelNine />
      </div>
    </>
  );
};

export default NineLoc;
