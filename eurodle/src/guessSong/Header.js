import React from 'react';

// import SettingsIcon from './settings.svg'; // Importa tu icono SVG o usa una librería

function Header({ onSettingsClick }) {

  return (

    <header className="app-header">

      <h1>Eurodle</h1>

      <button onClick={onSettingsClick} aria-label="Ajustes" className="settings-button">

        ⚙️ {/* O usa tu componente de icono */}

      </button>

    </header>

  );

}

export default Header;
