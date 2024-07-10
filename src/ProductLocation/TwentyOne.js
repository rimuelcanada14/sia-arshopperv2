import React from 'react';
import ModelTwentyOne from '../3DModels/ModelTwentyOne';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const TwentyOneLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelTwentyOne />
      </div>
    </>
  );
};

export default TwentyOneLoc;
