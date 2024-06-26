// Modal.js
import React from 'react';
import './Profile.css';
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ show, children, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
         <IoIosCloseCircle />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
