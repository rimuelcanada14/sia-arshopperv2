import React from 'react';
import ModelSeven from '../3DModels/ModelSeven';  // Update to ModelSeven, ModelEight, ..., ModelTwentyTwo as needed
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const SevenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelSeven />
      </div>
    </>
  );
};

export default SevenLoc;
