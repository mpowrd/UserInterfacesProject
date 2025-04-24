import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import "./css/estiloEuro.css";
import { FiSettings } from 'react-icons/fi'; // Necesita instalar: npm install react-icons
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";


function App() {

    const { t } = useTranslation('common');

    const navigate = useNavigate();

    const onSettingsClick = () => {
        navigate("/Settings");
    };

  return (
      <div className="eurodle-wrapper">
          <div className="eurodle-container">
              <div className="settings-icon">
                  {/*<button onClick={onSettingsClick} className="settings-btn" aria-label={t('settings.buttonLabel')}>*/}
                  {/*    <FiSettings size={24} />*/}
                  {/*</button>*/}

                  <button onClick={onSettingsClick} className="settings-btn" aria-label="Opciones">
                      ⚙️
                      {/*<FiSettings size={24} color="#ffffff"/>*/}
                  </button>
              </div>

              <header className="eurodle-header">
                  <h1 className="eurodle-title">{t('app.title')}</h1>
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
