import React from 'react';
import { useNavigate, useLocation  } from "react-router-dom";

// import SettingsIcon from './settings.svg'; // Importa tu icono SVG o usa una librería

function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/') {
        return null;
    }

    const onSettingsClick = () => {
        navigate("/Settings");
    };

    const onNameClick = () => {
        navigate("/");
    };

  return (

    <header className="app-header">

    <h1>
        <a onClick={onNameClick} style={{ cursor: "pointer", textDecoration: "none" }}>Eurodle</a>
    </h1>

      <button onClick={onSettingsClick} aria-label="Ajustes" className="settings-button">

        ⚙️ {/* O usa tu componente de icono */}

      </button>

    </header>

  );

}

export default Header;
