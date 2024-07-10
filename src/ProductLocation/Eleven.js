import React from 'react';
import ModelEleven from '../3DModels/ModelEleven';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'

const ElevenLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className="way-legend">LEGEND:</h1>
        <Legend />
        <ModelEleven />
      </div>
    </>
  );
};

export default ElevenLoc;
