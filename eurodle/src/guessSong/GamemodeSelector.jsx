import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import "../css/estiloEuro.css";
import DefaultPopup from "../DefaultPopup";

function GamemodeSelector() {
    const { t } = useTranslation(['common', 'guessSong']);
    const navigate = useNavigate();

    const [entradaInicio, setEntradaInicio] = useState("");
    const [entradaFin, setEntradaFin] = useState("");
    const [validInput, setValidInput] = useState(false);
    const [mostrarAyuda, setMostrarAyuda] = useState(false);

    const onSettingsClick = () => {
        navigate("/Settings");
    };

    const helpClick = () => {
        setMostrarAyuda(true);
    };

    const returnHome = () => {
        navigate('/');
    }

    const checkValidYear = (year) => {
        return year !== "" && year.length === 4 && year >= 2009 && year <= 2025;
    }

    const handleChangeInicio = (e) => {
        const valor = e.target.value;
        if (valor.length <= 4 && valor>=0) {
            setEntradaInicio(valor); // Actualiza el estado solo si no excede los 4 dígitos
            if((valor<=entradaFin) && checkValidYear(valor) && checkValidYear(entradaFin)){
                setValidInput(true);
            } else{
                setValidInput(false);
            }
        } else {
            setValidInput(false);
        }
    };

    const handleChangeFin = (e) => {
        const valor = e.target.value;
        if (valor.length <= 4 && valor>=0) {
            setEntradaFin(valor);
            if( (valor>=entradaInicio) && checkValidYear(valor) && checkValidYear(entradaInicio)){
                setValidInput(true);
            } else{
                setValidInput(false);
            }
            // const logBool = entradaFin !== "";
            // const log = "El valor fin es: " + valor + " valid: " + logBool + " la longitud es: " + valor.length;
            // console.log(log);
        } else {
            setValidInput(false);
        }
    };

    return (
        <div className="eurodle-wrapper">

            {mostrarAyuda &&
                <DefaultPopup title={t('guessSong:game.help')}
                              content={t('guessSong:help_info')}
                              onCancel={ () => setMostrarAyuda(false) }>
                </DefaultPopup>
            }

            <div className="eurodle-container">


                <header className="eurodle-header-home">
                    <h1 onClick={returnHome}>
                        <img src={"/tituloEuro.png"} className="eurodle-title-logo" alt={"Título Eurodle, pulsa para regresar a la pantalla principal"} />
                        <img  src={"/corazonEuroVacio.png"} className="eurodle-heart-logo" alt={"Logo corazón de Eurovision, pulsa para regresar a la pantalla principal"}/>
                    </h1>
                    <h2>
                        <p className="eurodle-subtitle">{t('guessSong:game.mode')}</p>
                    </h2>
                </header>

                <main className="eurodle-menu">

                    <h2 className="letrasAdivinanza">{t('guessSong:game.modes')}</h2>

                    <Link to="/GuessSongGame?hardcore=0">
                        <button className="eurodle-btn ">{t('guessSong:game.mode1')}</button>
                    </Link>
                    <Link to="/GuessSongGame?hardcore=1">
                        <button className="eurodle-btn ">{t('guessSong:game.mode2')}</button>
                    </Link>
                    <Link  to={"/GuessSongGame?hardcore=0&yearStart=" + entradaInicio + "&yearEnd=" + entradaFin}>
                        <button disabled={!validInput} className={validInput ? 'eurodle-btn' : 'disabled-eurodle-btn'}>{t('guessSong:game.mode3')}</button>
                    </Link>

                    <div className="input-range-group">
                        <input
                            id="yearStart"
                            className="inputYC range-input"
                            type="number"
                            placeholder={t('guessSong:game.yearStart')}
                            value={entradaInicio}
                            onChange={handleChangeInicio}
                        />
                        <div className="range-separator">—</div>
                        <input
                            id="yearEnd"
                            className="inputYC range-input"
                            type="number"
                            placeholder={t('guessSong:game.yearEnd')}
                            value={entradaFin}
                            onChange={handleChangeFin}
                        />
                    </div>

                    <button onClick={onSettingsClick} className=" eurodle-setting">
                        {t('common:menu.settings')}
                    </button>

                    <button onClick={helpClick} className=" eurodle-setting">
                        {t('common:menu.help')}
                    </button>

                </main>

                <footer className="eurodle-footer">
                    <p>{t('common:app.footer')}</p>
                    <p><a href="/about-us">{t('common:about')}</a> | <a href="/terms-of-use">{t('common:terms')}</a> | <a href="/cookies&privacy">{t('common:privacy')}</a></p>
                </footer>
            </div>
        </div>
    );
}

export default GamemodeSelector;
