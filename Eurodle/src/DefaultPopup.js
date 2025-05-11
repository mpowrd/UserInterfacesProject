// src/components/ConfirmPopup.js
import React from 'react';
import './css/ConfirmPopup.css';

const DefaultPopup = ({ title, content, onCancel }) => {

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-Xbutton-container">
                    <button className="popup-Xbutton" onClick={onCancel}><i className="bi bi-x-circle"></i></button>
                </div>
                <h3>{title || "Título"}</h3>
                {content.type === 'component' ? content.component : <p>{content}</p> }
            </div>
        </div>
    );
};

export default DefaultPopup;
