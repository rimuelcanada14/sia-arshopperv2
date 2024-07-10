import React from 'react';
import ModelTen from '../3DModels/ModelTen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const TenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelTen />
      </div>
    </>
  );
};

export default TenLoc;
