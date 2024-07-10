import React from 'react';
import ModelThree from '../3DModels/ModelThree';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const ThreeLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelThree />
      </div>
    </>
  );
};

export default ThreeLoc;
