import React, { createContext, useState, useContext } from 'react';
import i18n from "i18next";

// Crear el contexto
const SettingsContext = createContext();

// Proveedor del contexto
export const SettingsProvider = ({ children }) => {
    const [volume, setVolume] = useState(localStorage.getItem('volume') || 50); // Almacenamos en localStorage
    const [daltonicMode, setDaltonicMode] = useState(localStorage.getItem('daltonicMode') === 'true' || false);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');

    // Guardar los valores en localStorage al cambiar
    const updateVolume = (value) => {
        setVolume(value);
        localStorage.setItem('volume', value); // Guardar en localStorage
    };

    const updateDaltonicMode = (value) => {
        setDaltonicMode(value);
        localStorage.setItem('daltonicMode', value); // Guardar en localStorage
    };

    const updateLanguage = (value) => {
        setLanguage(value);
        i18n.changeLanguage(value);
        localStorage.setItem('language', value); // Guardar en localStorage
    };

    return (
        <SettingsContext.Provider value={{ volume, daltonicMode, language, updateVolume, updateDaltonicMode, updateLanguage }}>
            {children}
        </SettingsContext.Provider>
    );
};

// Hook para usar el contexto en cualquier componente
export const useSettings = () => useContext(SettingsContext);
