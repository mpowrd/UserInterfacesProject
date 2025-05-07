// src/components/ConfirmPopup.js
import React from 'react';
import './css/ConfirmPopup.css';
import { useTranslation } from 'react-i18next';

const ConfirmPopup = ({ title, message, onConfirm, onCancel }) => {
    const { t, i18n } = useTranslation('settings'); // Usa el namespace específico

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>{title || "Confirmación"}</h3>
                <p>{message || "¿Estás seguro de que deseas continuar?"}</p>
                <div className="popup-buttons">
                    <button onClick={onConfirm}>{t('afirmation')}</button>
                    <button onClick={onCancel}>{t('negative')}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
