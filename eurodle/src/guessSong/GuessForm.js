import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const GuessForm = ({ canciones, onGuess, fallos, mostrarPistas, cambiarAdivinanza, nuevaPista, mostrarPopupInfo, cambiarPopupInfo }) => {
    const { t } = useTranslation('guessSong');

    const [entrada, setEntrada] = useState("");
    const [entradaAnyo, setEntradaAnyo] = useState("");
    const [entradaPais, setEntradaPais] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [sugerenciasPais, setSugerenciasPais] = useState([]);
    const [guessType, setGuessType] = useState(0);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [error, setError] = useState("");

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
                !falladasNew.includes(cancion.song_name.toLowerCase())
            )
            .slice(0, 10); // Mostramos 10 canciones de autocompletado

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
            );

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



        if(guessType === 0){
            if (entrada.trim() !== "") {
                if(!falladas.includes(entrada.toLowerCase())){
                    onGuess(entrada.trim(), guessType);
                } else{
                    cambiarPopupInfo(t('form.alreadyGuessedSong'));
                    mostrarPopupInfo(true);
                }
                setEntrada("");
                setEntradaAnyo("");
                setEntradaPais("");
                setSugerencias([]);
                setSugerenciasPais([]);
                setMostrarSugerencias(false);
            }
            if (entrada.trim() === "") {  // Si no hay nada escrito en el campo de título
                cambiarPopupInfo(t('form.errorEmptyInputSong'));
                mostrarPopupInfo(true);
            }
        } else{
            if (entradaPais.trim() !== "" && entradaAnyo.trim() !== "") {
                const currYearCountryGuess = entradaPais + "$songGuess$" + entradaAnyo.trim();
                if(!falladasPaisAnyo.includes(currYearCountryGuess)){
                    onGuess(entradaPais + "$songGuess$" + entradaAnyo.trim(), guessType);
                } else{
                    cambiarPopupInfo(t('form.alreadyGuessedYearCountry'));
                    mostrarPopupInfo(true);
                }
                setEntrada("");
                setEntradaAnyo("");
                setEntradaPais("");
                setSugerencias([]);
                setSugerenciasPais([]);
                setMostrarSugerencias(false);
            }
            if (entrada.trim() === "") {  // Si no hay nada escrito en el campo de título
                cambiarPopupInfo(t('form.errorEmptyInputCountry'));
                mostrarPopupInfo(true);
            }
        }


    };

    const alternarModoJuego = () => {

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

    return (
        <div className="guess-form">

            {/* Aviso de adivinar con busqueda vacia */}
            {error && <div className="error-message" role="alert">{error}</div>}

                {/*RADIO DE TITULO Y AÑO/PAIS*/}
            <div className="shuffle-icon">
                <button onClick={alternarModoJuego} className="shuffle-btn" aria-label="Cambiar modo de juego">
                    <i className="bi bi-shuffle"></i>
                </button>
            </div>


            <input
                type="text"
                placeholder={t('form.placeholderSong')}
                value={entrada}
                onChange={handleChange}
                hidden={guessType}
                aria-label={t('form.placeholderSong')}
            />
            {/* Sugerencias dinámicas */}
            {entrada && (
                <ul className="sugerencias" hidden={!mostrarSugerencias || (guessType === 1 && (entradaPais !== null || entradaPais !== ""))}>
                    {sugerencias.length > 0 ? (
                        sugerencias.map((s, index) => (
                            <li key={index} onClick={() => handleClickSugerencia(s.song_name)}>
                                {s.song_name}
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
                <input className="inputYC"
                       type="number"
                       placeholder={t('form.placeholderYear')}
                       value={entradaAnyo}
                       onChange={handleChangeAnyo}
                       hidden={!guessType}
                       aria-label={t('form.placeholderYear')}
                />
                <input className="inputYC"
                       type="text"
                       placeholder={t('form.placeholderCountry')}
                       value={entradaPais}
                       onChange={handleChangePais}
                       hidden={!guessType}
                       aria-label={t('form.placeholderCountry')}
                />
            </div>

            {entradaPais && (
                <ul className="sugerencias" hidden={!mostrarSugerencias || (guessType === 0 && (entrada !== null || entrada !== ""))}>
                    {sugerenciasPais.length > 0 ? (
                        sugerenciasPais.map((s, index) => (
                            <li key={index} onClick={() => handleClickSugerenciaPais(s.country)}>
                                {s.country}
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
                <button className='guess-btn' onClick={mostrarPistas}>{t('form.clues')}
                    {nuevaPista===true ?  <i className="bi bi-circle-fill icono-pista"></i> : '' }</button>
            </div>
        </div>
    );
};

export default GuessForm;
