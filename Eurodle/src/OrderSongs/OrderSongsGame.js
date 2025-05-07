import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {useSettings} from "../SettingsProvider";
import Tarjetas from "./Tarjetas";
import Huecos from "./Huecos";
import Mensaje from "./Mensaje";
import { useTranslation } from 'react-i18next';

import "./OrderSongsGame.css";
import "../css/daltonicMode.css";

const OrderSongsGame = () => {
    const { daltonicMode } = useSettings();
    const [canciones, setCanciones] = useState([]);
    const [ordenCorrecto, setOrdenCorrecto] = useState([]);
    const [ordenUsuario, setOrdenUsuario] = useState([]);
    const [feedback, setFeedback] = useState(null); // Initialize feedback as null
    const [year, setYear] = useState(null);
    const [vidas, setVidas] = useState(3);
    const [mensaje, setMensaje] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const { t } = useTranslation(['orderSongs', 'common']);

    useEffect(() => {
        Papa.parse("/canciones.csv", {
            header: true,
            download: true,
            complete: (results) => {
                const validSongs = results.data.filter(c =>
                    c.song_name && c.final_place && c.year &&
                    c.song_name.trim() !== "" &&
                    c.final_place.trim() !== "" &&
                    c.year.trim() !== ""
                );

                const years = [...new Set(validSongs.map(c => c.year))];
                const randomYear = years[Math.floor(Math.random() * years.length)];
                setYear(randomYear);

                const topSongs = validSongs
                    .filter(c => c.year === randomYear)
                    .sort((a, b) => parseInt(a.final_place) - parseInt(b.final_place))
                    .slice(0, 5);

                setOrdenCorrecto(topSongs.map(c => c.song_name)); // Set correct order before shuffling

                // Shuffle the order of the cards
                const shuffledSongs = [...topSongs].sort(() => Math.random() - 0.5);

                setCanciones(shuffledSongs);
                setOrdenUsuario(Array(5).fill(null));
                setIsLoading(false);
            },
            error: (error) => {
                console.error(t('common:other.errorLoading'), error); // Traducir error
                setIsLoading(false); // Finaliza carga incluso con error
            },
        });
    }, [t]);

    const handleDragStart = (e, songName, index = null) => {
        e.dataTransfer.setData("text/plain", songName);
        if (index !== null) {
            const newOrdenUsuario = [...ordenUsuario];
            newOrdenUsuario[index] = null;
            setOrdenUsuario(newOrdenUsuario);
            setFeedback(null); // Reset feedback when modifying the order
        }
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const songName = e.dataTransfer.getData("text/plain");
        const newOrdenUsuario = [...ordenUsuario];
        newOrdenUsuario[index] = songName;
        setOrdenUsuario(newOrdenUsuario);
        setFeedback(null); // Reset feedback when modifying the order
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCheck = () => {
        if (vidas <= 0 || mensaje) return; // Si ya hay mensaje (juego terminado), no hacer nada

        const newFeedback = ordenUsuario.map((song, index) =>
            // Usar claves internas que Huecos traducirá
            song === ordenCorrecto[index] ? "✔️" : "❌"
        );
        setFeedback(newFeedback);

        if (ordenUsuario.every((song, index) => song === ordenCorrecto[index])) {
            // Línea ~71: Usar texto traducido para mensaje de victoria
            setMensaje(t('messages.win'));
        } else {
            const newVidas = vidas - 1;
            setVidas(newVidas);
            if (newVidas === 0) {
                // Línea ~76: Usar texto traducido para mensaje de derrota con interpolación
                setMensaje(t('messages.lose', { correctOrder: ordenCorrecto.join(", ") }));
            }
            // Si no es victoria y aún quedan vidas, no ponemos mensaje permanente aquí
        }
    };

    const reiniciarJuego = () => {
        window.location.reload(); // Reload the webpage
    };

    if (isLoading) {
        return <div>{t('common:other.loading')}</div>;
    }

    return (
        <div className={` order-songs-game ${daltonicMode ? "modo-daltonico" : ""}`}>
            <h1 className="title-order-song">{t('title')}</h1>
            {year && <p dangerouslySetInnerHTML={{ __html: t('selectedYear', { year }) }} />}
            <p className="information-order-song">{t('instructions')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('livesLeft', { count: vidas }) }} className="information-order-song"/>



            <Mensaje mensaje={mensaje} /> {/* Mensaje ya está traducido */}
            <Tarjetas canciones={canciones} ordenUsuario={ordenUsuario} handleDragStart={handleDragStart} />
            <Huecos
                ordenUsuario={ordenUsuario}
                feedback={feedback || []}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleDragStart={handleDragStart}
            />




            {/* Línea ~114: Cambiar texto botón, deshabilitar si el juego terminó */}
            <button onClick={handleCheck} className="comprobar-btn" disabled={!!mensaje}>
                {t('buttons.check')}
            </button>
            {/* Línea ~115: Cambiar texto botón */}
            {mensaje && <button onClick={reiniciarJuego} className="reiniciar-btn">
                {t('buttons.restart')}
            </button>}
        </div>
    );
};

export default OrderSongsGame;