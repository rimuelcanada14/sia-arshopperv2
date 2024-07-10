import React from 'react';
import ModelThirteen from '../3DModels/ModelThirteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const ThirteenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelThirteen />
      </div>
    </>
  );
};

export default ThirteenLoc;
