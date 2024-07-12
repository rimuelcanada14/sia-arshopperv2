import ModelSixteen from '../3DModels/ModelSixteen';
import Legend from './Legend';
import Header from '../components/header';
import './Wayfinding.css'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const SixteenLoc = () => {
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
        <ModelSixteen />
      </div>
    </>
  );
};

export default SixteenLoc;
