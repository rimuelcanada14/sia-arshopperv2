import React from 'react';
import ModelTwelve from '../3DModels/ModelTwelve';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const TwelveLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelTwelve />
      </div>
    </>
  );
};

export default TwelveLoc;
