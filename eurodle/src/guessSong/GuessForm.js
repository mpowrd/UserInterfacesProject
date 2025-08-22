import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const GuessForm = ({ canciones, onGuess, fallos, mostrarPistas, cambiarAdivinanza, nuevaPista, parpadeo, mostrarPopupInfo, cambiarPopupInfo,
validRange, yearRange, hardcore}) => {
    const { t } = useTranslation('guessSong');

    const [entrada, setEntrada] = useState("");
    const [entradaAnyo, setEntradaAnyo] = useState("");
    const [entradaPais, setEntradaPais] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [sugerenciasPais, setSugerenciasPais] = useState([]);
    const [guessType, setGuessType] = useState(0);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [error, setError] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const [falladas, setFalladas] = useState(fallos.map(f => f.song_name.toLowerCase()));
    const [falladasPaisAnyo, setFalladasPaisAnyo] = useState(fallos.map(f => f.country + "$songGuess$" + f.year));

    const handleChange = (e) => {
        const valor = e.target.value;
        setEntrada(valor);

        if (valor.length === 0) {
            setSugerencias([]);
            return;
        }

        // Listado de nombres de canciones falladas
        const falladasNew = fallos.map(f => f.song_name.toLowerCase());
        setFalladas(falladasNew);

        const falladasPANew = fallos.map(f => f.country + "$songGuess$" + f.year);
        setFalladasPaisAnyo(falladasPANew);

        //No mostramos en el filtro la canción si ya fue fallada
        const filtro = canciones
            .filter((cancion) =>
                cancion.song_name.toLowerCase().includes(valor.toLowerCase()) &&
                !falladasNew.includes(cancion.song_name.toLowerCase()) &&
                !falladasPANew.includes(cancion.country.toLowerCase()+"$songGuess$"+cancion.year.toLowerCase())
            )
            .slice(0, 10) // Mostramos 10 canciones de autocompletado
            .map((cancion) => {
                const name = cancion.song_name;
                const lowerName = name.toLowerCase();
                const lowerValor = valor.toLowerCase();

                const index = lowerName.indexOf(lowerValor);

                let parts;
                if (index !== -1) {
                    const before = name.slice(0, index);
                    const match = name.slice(index, index + valor.length);
                    const after = name.slice(index + valor.length);
                    parts = [before, match, after];
                } else {
                    parts = [name, "", ""]; // fallback por si acaso
                }

                return {
                    ...cancion,
                    highlightParts: parts
                };
            });

        setSugerencias(filtro);

        setMostrarSugerencias(true);
    };

    const handleChangePais = (e) => {
        const valor = e.target.value;
        setEntradaPais(valor);

        if (valor.length === 0) {
            setSugerenciasPais([]);
            return;
        }

        const falladasPANew = fallos.map(f => f.country + "$songGuess$" + f.year);
        setFalladasPaisAnyo(falladasPANew);

        const filtro = canciones
            .filter((cancion) =>
                cancion.country.toLowerCase().includes(valor.toLowerCase())
            ).slice(0, 10)
            .map((cancion) => {
                const pais = cancion.country;
                const lowerName = pais.toLowerCase();
                const lowerValor = valor.toLowerCase();

                const index = lowerName.indexOf(lowerValor);

                let parts;
                if (index !== -1) {
                    const before = pais.slice(0, index);
                    const match = pais.slice(index, index + valor.length);
                    const after = pais.slice(index + valor.length);
                    parts = [before, match, after];
                } else {
                    parts = [pais, "", ""]; // fallback por si acaso
                }

                return {
                    ...cancion,
                    highlightParts: parts
                };
            });

        // Creamos un objeto para mantener los países únicos, usando el país como clave.
        const paisesUnicos = filtro.reduce((acc, cancion) => {
            // Usamos el nombre del país como clave para evitar duplicados.
            if (!acc[cancion.country]) {
                acc[cancion.country] = cancion;
            }
            return acc;
        }, {});

        // Convertimos el objeto de países únicos de vuelta a un array.
        const paisesUnicosArray = Object.values(paisesUnicos).slice(0, 10);

        setSugerenciasPais(paisesUnicosArray);

        setMostrarSugerencias(true);
    };

    const handleChangeAnyo = (e) => {
        const valor = e.target.value;
        if (valor.length <= 4 && valor>=0) {
            setEntradaAnyo(valor); // Actualiza el estado solo si no excede los 4 dígitos
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        /* ----------  MODO  TÍTULO  ---------- */
        if (guessType === 0) {
            if (!entrada.trim()) { // input no existente
                cambiarPopupInfo(t('form.errorEmptyInputSong'));
                mostrarPopupInfo(true);
                return; // lo sacamos de este flujo de ejecucion
            }

            if (falladas.includes(entrada.toLowerCase())) { // el input ya fue escogido
                cambiarPopupInfo(t('form.alreadyGuessedSong'));
                mostrarPopupInfo(true);
                return; // lo sacamos de este flujo de ejecucion
            }

            onGuess(entrada.trim(), 0); // envia a handleGuess en GuessSongGame el input e identificador que adivinamos por titulo
        }

        /* ---------  MODO  AÑO + PAÍS -------- */
        if (guessType === 1) {

            if (!entradaPais.trim() || !entradaAnyo.trim()) { // input no existente
                cambiarPopupInfo(t('form.errorEmptyInputCountry'));
                mostrarPopupInfo(true);
                return; // lo sacamos de este flujo de ejecucion
            }

            if (validRange && (entradaAnyo.trim() < yearRange[0] || entradaAnyo.trim() > yearRange[1])) { // rango exedido
                cambiarPopupInfo(t('form.rangeLimit'));
                mostrarPopupInfo(true);
                return; // lo sacamos de este flujo de ejecucion
            }

            const clave = `${entradaPais}$songGuess$${entradaAnyo.trim()}`;
            if (falladasPaisAnyo.includes(clave)) { // el input ya fue escogido
                cambiarPopupInfo(t('form.alreadyGuessedYearCountry'));
                mostrarPopupInfo(true);
                return; // lo sacamos de este flujo de ejecucion
            }

            onGuess(clave, 1); // envia a handleGuess en GuessSongGame el input e identificador que adivinamos por pais y año
        }

        /* -------------  LIMPIEZA ------------- */
        // Si llegamos hasta aqui, significa que se ha introducido un input correcto (camino feliz cumplido)
        // Limpiamos todos los campos para la siguiente adivinanza
        setEntrada("");
        setEntradaAnyo("");
        setEntradaPais("");
        setSugerencias([]);
        setSugerenciasPais([]);
        setMostrarSugerencias(false);
    };

    const alternarModoJuego = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        if(guessType === 0){
            setGuessType(1);
            cambiarAdivinanza('yearCountry')
        } else{
            setGuessType(0);
            cambiarAdivinanza('title')
        }
    };

    const handleClickSugerencia = (titulo) => {
        setEntrada(titulo);
        setSugerencias([]);
        setMostrarSugerencias(false);
    };

    const handleClickSugerenciaPais = (titulo) => {
        setEntradaPais(titulo);
        setSugerenciasPais([]);
        setMostrarSugerencias(false);
    };

    const enterTitulo = (e) => {
        if(e.key === 'Enter'){
            if(sugerencias.length>0){
                setEntrada(sugerencias[0].song_name);
                setSugerencias([]);
                setMostrarSugerencias(false);
            }
        }
    };

    const enterPais = (e) => {
        if(e.key === 'Enter'){
            if(sugerenciasPais.length>0){
                setEntradaPais(sugerenciasPais[0].country);
                setSugerenciasPais([]);
                setMostrarSugerencias(false);
            }
        }
    };

    return (
        <div className="guess-form">

            {/* Aviso de adivinar con busqueda vacia */}
            {error && <div className="error-message" role="alert">{error}</div>}

                {/*RADIO DE TITULO Y AÑO/PAIS*/}
            <div className="wrapper">
                <div className="changeMode-container">

                    <h1 className="guess-title">
                        <strong
                            className="letrasAdivinanza"
                            data-text={guessType === 0
                                ? t('guessSong:game.guessByTitle')
                                : t('guessSong:game.guessByYearCountry')}>
                            {guessType === 0
                                ? t('guessSong:game.guessByTitle')
                                : t('guessSong:game.guessByYearCountry')}
                        </strong>
                    </h1>

                    {/*<div className="shuffle-txt">{t('form.changeMode')}</div>*/}

                    <div className="shuffle-icon">
                        <button onClick={alternarModoJuego} className={`shuffle-btn ${isAnimating ? "animate" : ""}`}>
                            <span className="visually-hidden">{t('form.labelSwitch')}</span>
                            <i className="bi bi-arrow-repeat"></i>
                        </button>
                    </div>

                    {validRange && <p className='small-text'>{yearRange[0]===yearRange[1] ? yearRange[0] : yearRange[0] + ' - ' + yearRange[1]}</p>}
                </div>
            </div>




            <label htmlFor="formT" className="visually-hidden">{t('form.labelTitle')}</label>
            <input
                id="formT"
                type="text"
                placeholder={t('form.placeholderSong')}
                value={entrada}
                onChange={handleChange}
                hidden={guessType}
                onKeyDown={enterTitulo}
            />
            {/* Sugerencias dinámicas */}
            {entrada && (
                <ul className="sugerencias" hidden={!mostrarSugerencias || (guessType === 1 && (entradaPais !== null || entradaPais !== ""))}>
                    {sugerencias.length > 0 ? (
                        sugerencias.map((s, index) => (
                            <li key={index} className={index === 0 ? "sugerencia-activa d-flex justify-content-between align-items-center" : ""} onClick={() => handleClickSugerencia(s.song_name)}>
                                <span>
                                <span className="texto_sec">{s.highlightParts[0]}</span>
                                <strong className="texto_prin">{s.highlightParts[1]}</strong>
                                <span className="texto_sec">{s.highlightParts[2]}</span>
                                </span>
                                {index === 0 ? <i className="bi bi-box-arrow-in-right"></i> : ""}
                            </li>
                        ))
                    ) : (
                        // Solo mostrar "no found" si la entrada actual no es una canción válida
                        !canciones.some(c => c.song_name.toLowerCase() === entrada.toLowerCase()) && (
                            <li className="no-suggestion">{t("noSongFound")}</li>
                        )
                    )}
                </ul>
            )}


            <div className="input-group">
                <input id="formY"
                       className="inputYC"
                       type="number"
                       placeholder={t('form.placeholderYear')}
                       value={entradaAnyo}
                       onChange={handleChangeAnyo}
                       hidden={!guessType}
                />
                <label htmlFor="formY" className="visually-hidden">{t('form.labelYear')}</label>
                <label htmlFor="formC" className="visually-hidden">{t('form.labelCountry')}</label>
                <input id="formC"
                       className="inputYC"
                       type="text"
                       placeholder={t('form.placeholderCountry')}
                       value={entradaPais}
                       onChange={handleChangePais}
                       hidden={!guessType}
                       onKeyDown={enterPais}
                />
            </div>

            {entradaPais && (
                <ul className="sugerencias" hidden={!mostrarSugerencias || (guessType === 0 && (entrada !== null || entrada !== ""))}>
                    {sugerenciasPais.length > 0 ? (
                        sugerenciasPais.map((s, index) => (
                            <li key={index} className={index === 0 ? "sugerencia-activa d-flex justify-content-between align-items-center" : ""} onClick={() => handleClickSugerenciaPais(s.country)}>
                                <span>
                                <span className="texto_sec">{s.highlightParts[0]}</span>
                                <strong className="texto_prin">{s.highlightParts[1]}</strong>
                                <span className="texto_sec">{s.highlightParts[2]}</span>
                                </span>
                                {index === 0 ? <i className="bi bi-box-arrow-in-right"></i> : ""}
                            </li>
                        ))
                    ) : (
                        // Solo mostrar el mensaje si la entrada actual no coincide con ningún país válido
                        !canciones.some(c => c.country.toLowerCase() === entradaPais.toLowerCase()) && (
                            <li className="no-suggestion">{t("noCountryFound")}</li>
                        )
                    )}
                </ul>
            )}


            <div className='end-buttons'>
                <button className='guess-btn' onClick={handleSubmit}>{t('form.submitButton')}</button>
                {!hardcore && <button className='guess-btn' onClick={mostrarPistas}>{t('form.clues')}
                    {nuevaPista===true ?  <i className="bi bi-circle-fill icono-pista"></i> : '' }</button>}
            </div>

            {!hardcore && nuevaPista && parpadeo && (
                <div className="tooltip-bocadillo animate-blink">
                    {t('form.newClues')}
                </div>
            )}

        </div>
    );
};

export default GuessForm;
