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
                          <img className="engranaje" src={"/engranaje.png"}/>
                      </button>
                  </div>
              )}
              <div className="back-icon">
              <button onClick={onBackClick} className="back-btn">
                  <img src={"/flecha-hacia-atras.png"} className="back"/>
              </button>
              </div>

              <header className="eurodle-header">
                  <div className="eurodle-header-text" onClick={onNameClick} style={{ cursor: "pointer", textDecoration: "none" }}>
                      <img src={"/tituloEuro.png"} className="eurodle-title-logo"/>
                      <img  src={"/corazonEuroVacio.png"} className="eurodle-heart-logo"/>
                  </div>
              </header>
          </div>

          {showSettings && <Settings setShowSettings={setShowSettings}></Settings>}

          <div className="header-spacer"></div>
      </div>
  );

}

export default Header;
