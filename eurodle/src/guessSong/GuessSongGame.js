import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import GuessForm from "./GuessForm";
import FeedbackDisplay from "./FeedbackDisplay";
import ClueDisplay from "./ClueDisplay";
import ExtraClues from "./ExtraClues";
import DefaultPopup from "../DefaultPopup";
import { useTranslation } from 'react-i18next';


import "../css/guessSong.css"
import YouTubePlayer from "./YouTubePlayer";
import ResultadoPopUp from "../ResultadoPopUp";

const GuessSongGame = () => {
    const { t } = useTranslation(['guessSong', 'common']);
    const totalIntentos = 8;
    const [canciones, setCanciones] = useState([]);
    const [cancionCorrecta, setCancionCorrecta] = useState(null);
    const [fallos, setFallos] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [intentosRestantes, setIntentosRestantes] = useState(totalIntentos); // Puedes ajustarlo a tu gusto
    const [acertado, setAcertado] = useState(false);

    const [pistasAdicionales, setPistasAdicionales] = useState(false); // controla si se muestra o no el popup con las pistas adicionales
    const [tipoAdivinanza, setTipoAdivinanza] = useState('title');
    const [nuevaPista, setNuevaPista] = useState(false);

    const [mostradoPopupVictoria, setMostradoPopupVictoria] = useState(false);
    const [mostradoPopupDerrota, setMostradoPopupDerrota] = useState(false);

    const [mostrarPopupInfo, setMostrarPopupInfo] = useState(false);
    const [mensajePopupInfo, setMensajePopupInfo] = useState("HOLAAAAAAAAA");

    useEffect(() => {
        setTipoAdivinanza('title');
        setNuevaPista(false);
        setMostradoPopupVictoria(false);
        setMostradoPopupDerrota(false);
        // Cargamos las caciones del csv al iniciar
        Papa.parse("/canciones.csv", {
            header: true,
            download: true,
            complete: (results) => {
                /*
                Vamos a filtrar la cancion por el atributo song_name asegurandonos que
                todos los campos clave existan y no estén vacíos.
                 */
                const listaCanciones = results.data.filter(c =>
                    c.song_name && c.song_name.trim() !== "" &&
                    c.artist_name && c.artist_name.trim() !== "" &&
                    c.country && c.country.trim() !== "" &&
                    c.year && c.year.trim() !== ""
                );

                setCanciones(listaCanciones);

                // Elegimos una canción aleatoria solo entre las válidas. Esta será la canción a adivinar
                const randomIndex = Math.floor(Math.random() * listaCanciones.length);
                const cancionSeleccionada = listaCanciones[randomIndex];

                const cancionArriba = results.data.filter(c =>
                    c.final_place && parseInt(c.final_place.trim()) === parseInt(cancionSeleccionada.final_place) - 1 &&
                    c.year && parseInt(c.year.trim()) === parseInt(cancionSeleccionada.year)
                );

                const cancionAbajo = results.data.filter(c =>
                    c.final_place && parseInt(c.final_place.trim()) === parseInt(cancionSeleccionada.final_place) + 1 &&
                    c.year && parseInt(c.year.trim()) === parseInt(cancionSeleccionada.year)
                );

                const unknownText = t('guessSong:extraClues.clueTemplates.neighboursParts.unknown'); // Obtener texto traducido

                cancionSeleccionada.paisArriba = cancionArriba.length === 0 ? unknownText : cancionArriba[0].country;
                cancionSeleccionada.paisAbajo = cancionAbajo.length === 0 ? unknownText : cancionAbajo[0].country;

                setCancionCorrecta(cancionSeleccionada);
            },
            error: (error) => {
                console.error(t('common:other.errorLoading'), error);
            }
        });
    }, [t]);

    const mostrarPistas = () => {
        setPistasAdicionales(true);
        setNuevaPista(false);
    };

    const ocultarPistas = () => {
        setPistasAdicionales(false);
    };

    const handleGuess = (entrada, tipo) => {
        if (!entrada) return;

        let guess;

        if(tipo === 0){
            guess = canciones.find((c) => c.song_name.toLowerCase() === entrada.toLowerCase());
        } else{
            const partes = entrada.split("$songGuess$");
            guess = canciones.find((c) => c.country.toLowerCase() === partes[0].toLowerCase()
            && c.year === partes[1]);
        }

        if (!guess) {
            setMensajePopupInfo(t('guessSong:form.notFound'));
            setMostrarPopupInfo(true);
            return;
        }

        // Verificar si el intento es correcto
        if (guess.song_name === cancionCorrecta.song_name) {
            setAcertado(true);
        } else {
            // Añadimos el fallo
            setFallos((prevFallos) => [...prevFallos, guess]);
            setIntentosRestantes((prev) => prev - 1);
        }

        // Generar pistas
        const pistasDelIntento = [
            { atributo: "Cantante", acertado: guess.artist_name === cancionCorrecta.artist_name ? "✅" : "❌" },
            { atributo: "País", acertado: guess.country === cancionCorrecta.country ? "✅" : "❌" },
            {
                atributo: "Año",
                acertado: (() => {
                    const guessYear = parseInt(guess.year);
                    const correctYear = parseInt(cancionCorrecta.year);
                    if (guessYear === correctYear) return "✔️ Correcto"; // Clave interna que ClueDisplay traducirá
                    if (guessYear < correctYear) return "🔼 Busca más reciente"; // Clave interna
                    return "🔽 Busca más antiguo"; // Clave interna
                })()
            },
            {
                atributo: "Ranking",
                acertado: (() => {
                    const guessRank = parseInt(guess.final_place);
                    const correctRank = parseInt(cancionCorrecta.final_place);
                    if (guessRank === correctRank) return "✔️ Correcto"; // Clave interna
                    if (guessRank > correctRank) return "🔼 Ranking más alto"; // Clave interna
                    return "🔽 Ranking más bajo"; // Clave interna
                })()
            }
        ];

        setPistas((prevPistas) => [{ intento: guess, pistas: pistasDelIntento }, ...prevPistas]);

        setNuevaPista(true);
    };

    const reiniciarJuego = () => {
        // Resetear todo
        const randomIndex = Math.floor(Math.random() * canciones.length);
        setCancionCorrecta(canciones[randomIndex]);
        setFallos([]);
        setPistas([]);
        setIntentosRestantes(totalIntentos);
        setAcertado(false);
        setNuevaPista(false);
        setMostradoPopupVictoria(false);
        setMostradoPopupDerrota(false);
        setTipoAdivinanza('title')
    };

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(cancionCorrecta) setIsLoading(false);
    }, [cancionCorrecta]);


    // Mostrar carga mientras cancionCorrecta es null
    if (isLoading) {
        // Línea ~130 (nueva): Mostrar mensaje de carga
        return <div>{t('common:other.loading')}</div>;
    }

    return (
        <div className=".eurodle-wrapper">
            <div className="guess-song-container">

                {/*{cancionCorrecta? cancionCorrecta.song_name + cancionCorrecta.year + cancionCorrecta.country : ""}*/}

                <h1 className='guess-title'>
                    {t('guessSong:game.guessBy')}
                    <strong
                        className="letrasAdivinanza"
                        data-text={tipoAdivinanza === 'title'
                            ? t('guessSong:game.guessByTitle')
                            : t('guessSong:game.guessByYearCountry')}>
                        {tipoAdivinanza === 'title'
                            ? t('guessSong:game.guessByTitle')
                            : t('guessSong:game.guessByYearCountry')}
                    </strong>
                </h1>

                <div className="contenido-principal">

                    {/* Formulario de adivinanza */}
                    {!acertado && intentosRestantes > 0 && (
                        <GuessForm
                            canciones={canciones}
                            onGuess={handleGuess}
                            fallos={fallos}
                            mostrarPistas={mostrarPistas}
                            cambiarAdivinanza={setTipoAdivinanza}
                            nuevaPista={nuevaPista}
                            setNuevaPista={setNuevaPista}
                            mostrarPopupInfo={setMostrarPopupInfo}
                            cambiarPopupInfo={setMensajePopupInfo}
                        />
                    )}

                    {/* Visualización de fallos */}
                    <FeedbackDisplay fallos={fallos} acertado={acertado} cancionCorrecta={cancionCorrecta} totalIntentos={totalIntentos}/>

                    {/* Visualización de pistas */}
                    <ClueDisplay pistas={pistas}/>

                    {/* Botón para reiniciar cuando acabe el juego */}
                    {(acertado || intentosRestantes <= 0) && (
                        <div className='end-buttons'>
                        <button className='guess-btn' onClick={reiniciarJuego} style={{ marginTop: "20px" }}>
                            {t('guessSong:game.restart')}
                        </button>
                        <button className='guess-btn' onClick={mostrarPistas} style={{ marginTop: "20px" }}>
                            {t('guessSong:game.showAll')}
                        </button>
                        </div>
                    )}

                    {/* Pistas adicionales progresivas */}

                    {pistasAdicionales &&
                    <DefaultPopup
                        content={{ type: 'component', component: <ExtraClues songData={cancionCorrecta} fallos={fallos} acertado={acertado} /> }}
                        title={t('guessSong:extraClues.title')}
                        onCancel={ocultarPistas}
                    />}

                    {acertado && !mostradoPopupVictoria &&
                        <ResultadoPopUp tipo={'victoria'}
                                        mensajePrincipal={t('guessSong:form.correctGuess')}
                                        onRestart={() => setMostradoPopupVictoria(true)}
                                        buttonMessage={t('OK')}>
                        </ResultadoPopUp>
                    }

                    {intentosRestantes === 0 && !mostradoPopupDerrota &&
                        <ResultadoPopUp tipo={'derrota'}
                                        mensajePrincipal={t('guessSong:form.lost')}
                                        mensajeSecundario={t('guessSong:form.lostSub')}
                                        onRestart={() => setMostradoPopupDerrota(true)}
                                        buttonMessage={t('OK')}>
                        </ResultadoPopUp>
                    }

                    {mostrarPopupInfo &&
                        <DefaultPopup title={t('guessSong:game.info')}
                                      content={mensajePopupInfo}
                                      onCancel={ () => setMostrarPopupInfo(false) }>
                        </DefaultPopup>
                    }

                </div>
            </div>
        </div>
    );
};

export default GuessSongGame;
