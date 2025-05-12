import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "./css/estiloEuro.css";

function App() {
    const { t } = useTranslation('common');
    const navigate = useNavigate();
    const location = useLocation();
    const isSettingsPage = location.pathname === "/Settings";

    const onSettingsClick = () => {
        navigate("/Settings");
    };

    return (
        <div className="eurodle-wrapper">
            <div className="eurodle-container">


                <header className="eurodle-header-home">
                    <img src={"/tituloEuro.png"} className="eurodle-title-logo"/>
                    <img  src={"/corazonEuroVacio.png"} className="eurodle-heart-logo"/>
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

                    <button onClick={onSettingsClick} className="eurodle-btn eurodle-setting" aria-label="Opciones">
                        {t('menu.settings')}
                    </button>

                </main>

                <footer className="eurodle-footer">
                    <p>{t('app.footer')}</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
