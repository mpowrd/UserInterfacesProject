import React from 'react';
import { useSettings } from './SettingsProvider'; // Importa el hook del contexto
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './css/settings.css';


const Settings = () => {
    const { t, i18n } = useTranslation('settings'); // Usa el namespace específico
    const { volume, daltonicMode, language, updateVolume, updateDaltonicMode, updateLanguage } = useSettings(); // Usamos el hook para acceder a los valores y actualizarlos

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // vuelve a la pantalla anterior
    };

    const handleLanguageChange = (lang) => {
        updateLanguage(lang);
        i18n.changeLanguage(lang); // Cambia el idioma solo para este componente
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
                    value={volume} // Enlace con la variable de estado
                    onChange={(e) => updateVolume(e.target.value)} // Actualizamos la variable de estado al cambiar
                />
                {/*<span>{volume}</span> /!* Muestra el valor del volumen *!/*/}
            </div>

            <div className="settings-item">
                <label htmlFor="daltonicMode">
                    <input
                        type="checkbox"
                        id="daltonicMode"
                        checked={daltonicMode} // Enlace con la variable de estado
                        onChange={(e) => updateDaltonicMode(e.target.checked)} // Actualizamos la variable de estado al cambiar
                    />
                    {t('daltonicMode')}
                </label>
            </div>

            <div className="settings-item">
                <label htmlFor="language">{t('language')}:</label>
                <select
                    id="language"
                    name="language"
                    value={language} // Enlace con la variable de estado
                    onChange={(e) => handleLanguageChange(e.target.value)} // Actualizamos la variable de estado al cambiar
                >
                    <option value="es">{t('languages.es')}</option>
                    <option value="en">{t('languages.en')}</option>
                    <option value="fr">{t('languages.fr')}</option>
                </select>
            </div>

            <button onClick={handleBack} className="settings-btn-return-home">{t('back')}</button>

        </div>
    );
};

export default Settings;
