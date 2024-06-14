import React, { useState } from 'react';
import axios from 'axios';
import { FaNotesMedical } from "react-icons/fa6";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import './Illness.css';
import Header from '../components/header';
import { RxCrossCircled } from "react-icons/rx";

const Illness = () => {
  const [formData, setFormData] = useState({
    illness: 'respiratory', 
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [illnessErr, setIllnessError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIllnessError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://192.168.100.90:8000/api/signup/', formData);
      if (response.status === 201) {
        console.log('Illness data submitted successfully!');
        setSuccessMessage('Illness data submitted successfully!');

        setTimeout(() => {
          navigate('/');
        }, 2000); 
       
      } else {
        console.error('Failed to submit illness data');
      }
    } catch (error) {
      console.error('Failed to submit illness data', error);
    }
  };

  return (
    <div>
      <div className='illness-header'>
        <Header header="ARShopper" headerright="ICHI MART" headersub="©"/>
      </div>

      <div className='illness-page'>
        <h1 className="illness-title">SET ILLNESS</h1>
        <form onSubmit={handleSubmit}>
          <div className="illness-container">
            <p className="illness-categories">Enter Health Complication/s</p>
            <div className="illness-health">
              <FaNotesMedical className="illness-icon-health" />
              <select
                name="illness"
                id="illness-input-health"
                onChange={handleChange}
                value={formData.illness}
              >
                <option value="respiratory">Respiratory Infections</option>
                <option value="hypertension">Hypertension</option>
                <option value="uti">Urinary Tract Infection</option>
                <option value="animal">Animal Bites</option>
                <option value="skin">Skin Diseases</option>
                <option value="pneumonia">Pneumonia</option>
                <option value="diarrhea">Diarrhea</option>
              </select>
            </div>
          </div>

          <div className='illness-low'>
            {illnessErr &&
              <div className="popup">
                <RxCrossCircled className='ekis'/>
                <div className="popup-text">
                  {illnessErr}
                </div>
                <RxCrossCircled className='ekisR'/>
              </div>
            }

            {successMessage &&
              <div className="popup-success">
                <FcApproval className="signup-check"/>
                <div className="success-text">
                  {successMessage}
                </div>
                <FcApproval className="signup-checkR"/>
              </div>
            }

            <button type="submit" className="illness-submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Illness;
