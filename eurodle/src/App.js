import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import "./css/estiloEuro.css";

function App() {
    const { t } = useTranslation('common');
    const navigate = useNavigate();
    const onSettingsClick = () => {
        navigate("/Settings");
    };

    return (
        <div className="eurodle-wrapper">
            <div className="eurodle-container">


                <header className="eurodle-header-home">
                    <h1>
                        <img src={"/tituloEuro.png"} className="eurodle-title-logo" alt={"Título Eurodle, pulsa para regresar a la pantalla principal"}/>
                        <img  src={"/corazonEuroVacio.png"} className="eurodle-heart-logo" alt={"Logo corazón de Eurovision, pulsa para regresar a la pantalla principal"}/>
                    </h1>
                    <h2>
                        <p className="eurodle-subtitle">{t('app.subtitle')}</p>
                    </h2>
                </header>

                <main className="eurodle-menu">
                    <Link to="/GuessSongGame/GameModeSelector">
                        <button className="eurodle-btn ">{t('menu.guessSong')}</button>
                    </Link>
                    <Link to="/OrderSongsGame">
                        <button className="eurodle-btn ">{t('menu.orderSongs')}</button>
                    </Link>
                    <Link to="/AdivinaPais">
                        <button className="eurodle-btn ">{t('menu.guessCountry')}</button>
                    </Link>

                    <button onClick={onSettingsClick} className=" eurodle-setting">
                        {t('menu.settings')}
                    </button>

                </main>

                <footer className="eurodle-footer">
                    <p>{t('app.footer')}</p>
                    <p><a href="/about-us">{t('about')}</a> | <a href="/terms-of-use">{t('terms')}</a> | <a href="/cookies&privacy">{t('privacy')}</a></p>
                </footer>
            </div>
        </div>
    );
}

export default App;
