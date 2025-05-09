import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useSettings } from "../SettingsProvider";
import Tarjetas from "./Tarjetas";
import Huecos from "./Huecos";
import { useTranslation } from 'react-i18next';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ResultadoPopUp from "./ResultadoPopUp";

// Asumo que OrderSongsGame.css es el principal que me pasaste
import "./OrderSongsGame.css";
// Si daltonicMode.css es específico para este componente o una característica, está bien.
// Si es más global, podría ir en index.js o App.js
import "../css/daltonicMode.css";

const OrderSongsGame = () => {
    const { daltonicMode } = useSettings();
    const { t } = useTranslation(['orderSongs', 'common']);

    const [canciones, setCanciones] = useState([]);
    const [ordenCorrecto, setOrdenCorrecto] = useState([]);
    const [ordenUsuario, setOrdenUsuarioState] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [year, setYear] = useState(null);
    const [vidas, setVidas] = useState(3);
    // 'mensaje' ya no se usa directamente para el display, ahora es 'mensajePopUp'
    // const [mensaje, setMensaje] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [resultadoTipo, setResultadoTipo] = useState(null);
    const [mensajePopUp, setMensajePopUp] = useState(null);
    const [mensajeSecundarioPopUp, setMensajeSecundarioPopUp] = useState(null);


    useEffect(() => {
        setIsLoading(true);
        Papa.parse("/canciones.csv", {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: (results) => {
                const validSongs = results.data.filter(c =>
                    c.song_name && c.final_place && c.year &&
                    c.song_name.trim() !== "" &&
                    c.final_place.trim() !== "" &&
                    c.year.trim() !== ""
                );

                if (validSongs.length === 0) {
                    setResultadoTipo('error'); // Usar para el pop-up de error
                    setMensajePopUp(t('common:other.errorLoading'));
                    setIsLoading(false);
                    return;
                }

                const years = [...new Set(validSongs.map(c => c.year))];
                const randomYear = years[Math.floor(Math.random() * years.length)];
                setYear(randomYear);

                const topSongs = validSongs
                    .filter(c => c.year === randomYear)
                    .sort((a, b) => parseInt(a.final_place) - parseInt(b.final_place))
                    .slice(0, 5);

                if (topSongs.length < 5) { // Asegurar que hay suficientes canciones
                    setResultadoTipo('error');
                    setMensajePopUp(t('common:other.errorNotEnoughSongsForYear', { year: randomYear, count: 5 }));
                    setIsLoading(false);
                    return;
                }

                setOrdenCorrecto(topSongs.map(c => c.song_name));
                const shuffledSongs = [...topSongs].sort(() => Math.random() - 0.5);
                setCanciones(shuffledSongs);
                setOrdenUsuarioState(Array(topSongs.length).fill(null)); // Usar topSongs.length
                setFeedback(null);
                setResultadoTipo(null); // Asegurar que se resetea al cargar
                setMensajePopUp(null);
                setMensajeSecundarioPopUp(null);
                setVidas(3); // Resetear vidas
                setIsLoading(false);
            },
            error: (error) => {
                console.error(t('common:other.errorLoading'), error);
                setResultadoTipo('error');
                setMensajePopUp(t('common:other.errorLoading'));
                setIsLoading(false);
            },
        });
    }, [t]); // t como dependencia

    const setOrdenUsuario = (newOrdenUsuarioSetter) => {
        setOrdenUsuarioState(prevOrdenUsuario => {
            const newOrden = typeof newOrdenUsuarioSetter === 'function'
                ? newOrdenUsuarioSetter(prevOrdenUsuario)
                : newOrdenUsuarioSetter;

            if (feedback !== null && JSON.stringify(newOrden) !== JSON.stringify(prevOrdenUsuario) && !resultadoTipo) {
                setFeedback(null);
            }
            return newOrden;
        });
    };

    const handleCheck = () => {
        if (resultadoTipo || ordenUsuario.some(song => song === null)) {
            return;
        }
        const newFeedbackArray = ordenUsuario.map((song, index) => {
            if (song === null) return null;
            return song === ordenCorrecto[index] ? "✔️" : "❌";
        });
        setFeedback(newFeedbackArray);

        if (ordenUsuario.every((song, index) => song === ordenCorrecto[index])) {
            setResultadoTipo('victoria');
            setMensajePopUp(t('orderSongs:messages.win'));
            setMensajeSecundarioPopUp(null);
        } else {
            const newVidas = vidas - 1;
            setVidas(newVidas);
            if (newVidas === 0) {
                setResultadoTipo('derrota');
                setMensajePopUp(t('orderSongs:messages.loseBase'));
                setMensajeSecundarioPopUp(t('orderSongs:messages.lose', { correctOrder: ordenCorrecto.join(", ") }));
            }
        }
    };

    const reiniciarJuego = () => {
        // Reseteo de estados para el pop-up antes de la recarga, aunque la recarga lo haría igual
        setResultadoTipo(null);
        setMensajePopUp(null);
        setMensajeSecundarioPopUp(null);
        window.location.reload();
    };

    if (isLoading) {
        // Aplicar una clase para estilizar el mensaje de carga
        return <div className="loading-message-container">{t('common:other.loading')}</div>;
    }

    // Si hay un mensaje de error en el pop-up (por ej. error de carga), mostrar solo el pop-up.
    // Esto se maneja al final con el renderizado de ResultadoPopUp.
    // Si el resultadoTipo es 'error', el resto del juego no debería renderizarse o interactuar.

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`order-songs-game ${daltonicMode ? "modo-daltonico" : ""}`}>
                <div className="order-songs-game-container">
                    <h1 className="title-order-song">{t('orderSongs:title')}</h1>
                    <p className="instructions">{t('orderSongs:instructions')}</p>

                    {/* NUEVA BARRA DE ESTADO Y ACCIONES */}
                    <div className="game-status-and-actions">
                        {year && (
                            <div className="status-info-item">
                                <span className="label">{t('orderSongs:yearLabel', 'Año')}</span>
                                <span className="value">{year}</span>
                            </div>
                        )}

                        {/* Botón Comprobar en el medio o según layout de flex */}
                        {resultadoTipo !== 'error' && ( // Solo mostrar botón si se puede jugar
                            <button
                                onClick={handleCheck}
                                className="comprobar-btn" // Puede necesitar ajustes específicos si está aquí
                                disabled={
                                    !!resultadoTipo ||
                                    ordenUsuario.some(s => s === null) ||
                                    !!feedback
                                }
                            >
                                {t('orderSongs:buttons.check')}
                            </button>
                        )}

                        <div className="status-info-item">
                            <span className="label">{t('orderSongs:livesLabel', 'Vidas')}</span>
                            <span className="value">{vidas}</span>
                        </div>
                    </div>


                    {resultadoTipo !== 'error' && (
                        <>
                            <div className="game-container">
                                <Tarjetas
                                    canciones={canciones}
                                    ordenUsuario={ordenUsuario}
                                    setOrdenUsuario={setOrdenUsuario}
                                    isGameFinished={!!resultadoTipo}
                                />
                                <Huecos
                                    ordenUsuario={ordenUsuario}
                                    setOrdenUsuario={setOrdenUsuario}
                                    feedback={feedback}
                                    isGameFinished={!!resultadoTipo}
                                />
                            </div>
                            {/* El div .action-buttons original se elimina o se vacía */}
                        </>
                    )}

                    <ResultadoPopUp
                        tipo={resultadoTipo}
                        mensajePrincipal={mensajePopUp}
                        mensajeSecundario={mensajeSecundarioPopUp}
                        onRestart={reiniciarJuego}
                    />
                </div>

            </div>
        </DndProvider>
    );
};

export default OrderSongsGame;