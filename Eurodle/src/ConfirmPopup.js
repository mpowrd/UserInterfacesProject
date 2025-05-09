// src/components/ConfirmPopup.js
import React from 'react';
import './css/ConfirmPopup.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const ConfirmPopup = ({ title, message, yes, no, onConfirm, onCancel }) => {

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-Xbutton-container">
                    <button className="popup-Xbutton" onClick={onCancel}> <i class="bi bi-x-circle"></i> </button>
                </div>
                <h3>{title || "Confirmación"}</h3>
                <p>{message || "¿Estás seguro de que deseas continuar?"}</p>
                <div className="popup-buttons">
                    <button onClick={onConfirm}>{yes}</button>
                    <button onClick={onCancel}>{no}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
