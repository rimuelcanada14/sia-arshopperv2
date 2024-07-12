import ModelEleven from '../3DModels/ModelEleven';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const ElevenLoc = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);
  return (
    <>
      <div>
        <Header
          header={<button onClick={() => navigate(-1)} className="products-back">BACK</button>}
          headersub="&nbsp;"
          headerright="LOCATION"
        />
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
