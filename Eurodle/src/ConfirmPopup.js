// src/components/ConfirmPopup.js
import React from 'react';
import './css/ConfirmPopup.css';

const ConfirmPopup = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>{title || "Confirmación"}</h3>
                <p>{message || "¿Estás seguro de que deseas continuar?"}</p>
                <div className="popup-buttons">
                    <button onClick={onConfirm}>Sí</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
