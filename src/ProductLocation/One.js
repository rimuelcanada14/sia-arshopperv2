import React from 'react';
import One from '../3DModels/1';
import Header from '../components/header';
import './Wayfinding.css'

const OneLoc = () => {
  return (
    <>
      <div>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©" />
      </div>

      <div>
        <h1 className = "way-legend">LEGEND:</h1>
        <One />
      </div>
    </>
    
  );
};

export default OneLoc;
