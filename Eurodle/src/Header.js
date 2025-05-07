import React from 'react';
import { useNavigate, useLocation  } from "react-router-dom";
import "./css/estiloEuro.css";


// import SettingsIcon from './settings.svg'; // Importa tu icono SVG o usa una librería

function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const isSettingsPage = location.pathname === "/Settings";

    if (location.pathname === '/') {
        return null;
    }

    const onSettingsClick = () => {
        navigate("/Settings");
    };

    const onBackClick = () => {
        navigate(-1);
    };

    const onNameClick = () => {
        navigate("/");
    };

  return (
      <div>
          {!isSettingsPage && (
              <div className="settings-icon">
                  <button onClick={onSettingsClick} className="settings-btn" aria-label="Opciones">
                      <img className="engranaje" src={"/engranaje.png"}/>
                  </button>
              </div>
          )}
          <div className="back-icon">
          <button onClick={onBackClick} className="back-btn">
              <img src={"/flecha-hacia-atras.png"} className="engranaje"/>
          </button>
          </div>

          <header className="eurodle-header">

              <h1 className="eurodle-header-text">
                  <a onClick={onNameClick} style={{ cursor: "pointer", textDecoration: "none" }}>Eurodle</a>
              </h1>
          </header>


      </div>








  );

}

export default Header;
