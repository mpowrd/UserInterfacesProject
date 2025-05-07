import React from 'react';
import { useSettings } from './SettingsProvider'; // Importa el hook del contexto
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {useEffect, useState} from "react";
import ConfirmPopup from './ConfirmPopup'; // Ajusta la ruta si es necesario

import './css/settings.css';


const Settings = () => {
    const { t, i18n } = useTranslation('settings'); // Usa el namespace específico
    const { volume, daltonicMode, language, updateVolume, updateDaltonicMode, updateLanguage } = useSettings(); // Usamos el hook para acceder a los valores y actualizarlos
    const [selected_language, setLangu] = useState(language)
    const [selected_volume, setVolum] = useState(volume)
    const [selected_daltonic, setDaltonic] = useState(daltonicMode)
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    const handleSave = () => {

        updateLanguage(selected_language);
        i18n.changeLanguage(selected_language); // Cambia el idioma solo para este componente
        updateVolume(selected_volume);
        updateDaltonicMode(selected_daltonic);

    };

    const handleLanguageChange = (lang) => {

        setLangu(lang);
    };

    return (
        <div className="settings-panel">
            <h2>{t('title')}</h2>

            <div className="settings-item">
                <label htmlFor="volume">{t('volume')}:</label>
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    min="0"
                    max="100"
                    value={selected_volume} // Enlace con la variable de estado
                    onChange={(e) => setVolum(e.target.value)} // Actualizamos la variable de estado al cambiar
                />
                {/*<span>{volume}</span> /!* Muestra el valor del volumen *!/*/}
            </div>

            <div className="settings-item">
                <label htmlFor="daltonicMode">
                    <input
                        type="checkbox"
                        id="daltonicMode"
                        checked={selected_daltonic} // Enlace con la variable de estado
                        onChange={(e) => setDaltonic(e.target.checked)} // Actualizamos la variable de estado al cambiar
                    />
                    {t('daltonicMode')}
                </label>
            </div>

            <div className="settings-item">
                <label htmlFor="language">{t('language')}:</label>
                <select
                    id="language"
                    name="language"
                    value={selected_language} // Enlace con la variable de estado
                    onChange={(e) => handleLanguageChange(e.target.value)} // Actualizamos la variable de estado al cambiar
                >
                    <option value="es">{t('languages.es')}</option>
                    <option value="en">{t('languages.en')}</option>
                    <option value="fr">{t('languages.fr')}</option>
                </select>
            </div>

            <button onClick={()=>{setShowConfirm(true)}} className="settings-btn-return-home">{t('save')}</button>

            {showConfirm && (
                <ConfirmPopup
                    title={t('confirmTitleSettings')}
                    message={t('confirmMessageSettings')}
                    yes={t('confirmYesSettings')}
                    no={t('confirmNoSettings')}
                    onConfirm={() => {
                        handleSave();
                        setShowConfirm(false);
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

        </div>
    );
};

export default Settings;
