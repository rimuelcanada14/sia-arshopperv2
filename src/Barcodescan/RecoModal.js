// Modal.js
import React from 'react';
import './Barcodescan.css';
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ show, children, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container-c">
        <button className="modal-close" onClick={onClose}>
         <IoIosCloseCircle />
        </button>
        <div className="modal-content-reco">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
