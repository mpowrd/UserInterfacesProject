import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import "./css/estiloEuro.css";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



function App() {

    const { t } = useTranslation('common');

    const navigate = useNavigate();

    const onSettingsClick = () => {
        navigate("/Settings");
    };

    const location = useLocation();
    const isSettingsPage = location.pathname === "/Settings";


    return (
      <div className="eurodle-wrapper">
          <div className="eurodle-container">
              {!isSettingsPage && (
                  <div className="settings-icon">
                      <button onClick={onSettingsClick} className="settings-btn" aria-label="Opciones">
                          <img className="engranaje-home" src={"/engranaje.png"} />
                      </button>
                  </div>
              )}


              <header className="eurodle-header-home">
                  <img src={"/tituloEuro.png"} className="eurodle-title-logo"/>
                  <img  src={"/corazonEuro.png"} className="eurodle-heart-logo"/>
                  <p className="eurodle-subtitle">{t('app.subtitle')}</p>
              </header>

              <main className="eurodle-menu">
                  <Link to="/GuessSongGame">
                      <button className="eurodle-btn">{t('menu.guessSong')}</button>
                  </Link>
                  <Link to="/OrderSongsGame">
                      <button className="eurodle-btn">{t('menu.orderSongs')}</button>
                  </Link>
                  <Link to="/AdivinaPais">
                      <button className="eurodle-btn">{t('menu.guessCountry')}</button>
                  </Link>
                  <button className="eurodle-btn disabled" disabled>{t('menu.higherLower')}</button>
              </main>

              <footer className="eurodle-footer">
                  <p>{t('app.footer')}</p>
              </footer>
          </div>
      </div>
    
  );
}

export default App;
