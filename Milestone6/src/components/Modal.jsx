import React from "react";
import './modal.css'

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content text-center">
        {children}
        <button className="text-white bg-blue-500 hover:scale-110 px-10 py-3 justify-items-center rounded-lg mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
