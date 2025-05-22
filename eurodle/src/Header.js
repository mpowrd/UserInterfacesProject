import React, {useState} from 'react';
import { useNavigate, useLocation  } from "react-router-dom";
import "./css/estiloEuro.css";
import Settings from "./Settings";


// import SettingsIcon from './settings.svg'; // Importa tu icono SVG o usa una librería

function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const isSettingsPage = location.pathname === "/Settings";
    const [showSettings, setShowSettings] = useState(false);

    if (location.pathname === '/') {
        return null;
    }

    const onSettingsClick = () => {
        setShowSettings(true);
    };

    const onBackClick = () => {
        if(showSettings){
            setShowSettings(false);
        } else{
            navigate(-1);
        }
    };

    const onNameClick = () => {
        navigate("/");
    };

  return (
      <div className="header-abs">
          <div className='header-head'>
              {!showSettings && !isSettingsPage && (
                  <div className="settings-icon">
                      <button onClick={onSettingsClick} className="settings-btn" aria-label="Opciones">
                          <img className="engranaje" src={"/engranaje.png"} alt={"Botón de Configuración"}/>
                      </button>
                  </div>
              )}
              <div className="back-icon">
              <button onClick={onBackClick} className="back-btn">
                  <img src={"/flecha-hacia-atras.png"} className="back" alt={"Botón para regresar a pantalla anterior."}/>
              </button>
              </div>

              <header className="eurodle-header">
                  <div className="eurodle-header-text" onClick={onNameClick} style={{ cursor: "pointer", textDecoration: "none" }}>
                      <img src={"/tituloEuro.png"} className="eurodle-title-logo" alt={"Titulo Eurodle, pulsa para regresar a la pantalla principal"}/>
                      <img  src={"/corazonEuroVacio.png"} className="eurodle-heart-logo" alt={"Logo corazón de Eurovision, pulsa para regresar a la pantalla principal"}/>
                  </div>
              </header>
          </div>

          {showSettings && <Settings setShowSettings={setShowSettings}></Settings>}

          <div className="header-spacer"></div>
      </div>
  );

}

export default Header;
