import React from 'react';
import ModelTwenty from '../3DModels/ModelTwenty';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const TwentyLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelTwenty />
      </div>
    </>
  );
};

export default TwentyLoc;
