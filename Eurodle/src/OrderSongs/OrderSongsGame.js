import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./OrderSongsGame.css";
import Tarjetas from "./Tarjetas";
import Huecos from "./Huecos";
import Mensaje from "./Mensaje";

const OrderSongsGame = () => {
    const [canciones, setCanciones] = useState([]);
    const [ordenCorrecto, setOrdenCorrecto] = useState([]);
    const [ordenUsuario, setOrdenUsuario] = useState([]);
    const [feedback, setFeedback] = useState(null); // Initialize feedback as null
    const [year, setYear] = useState(null);
    const [vidas, setVidas] = useState(3);
    const [mensaje, setMensaje] = useState(null);

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
            },
            error: (error) => console.error("Error loading CSV:", error),
        });
    }, []);

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
        if (vidas <= 0 || mensaje) return;

        const newFeedback = ordenUsuario.map((song, index) =>
            song === ordenCorrecto[index] ? "✔️" : "❌"
        );
        setFeedback(newFeedback); // Set feedback after checking

        if (ordenUsuario.every((song, index) => song === ordenCorrecto[index])) {
            setMensaje("¡Felicidades! Has ordenado las canciones correctamente 🎉");
        } else {
            setVidas(vidas - 1);
            if (vidas - 1 === 0) {
                setMensaje(`Has perdido. El orden correcto era: ${ordenCorrecto.join(", ")}`);
            }
        }
    };

    const reiniciarJuego = () => {
        window.location.reload(); // Reload the webpage
    };

    return (
        <div className="order-songs-game">
            <h1>Ordena las Canciones</h1>
            {year && <p>Año seleccionado: <strong>{year}</strong></p>}
            <p>Arrastra las canciones a los huecos en el orden correcto.</p>
            <p>Vidas restantes: <strong>{vidas}</strong></p>

            <Mensaje mensaje={mensaje} />
            <Tarjetas canciones={canciones} ordenUsuario={ordenUsuario} handleDragStart={handleDragStart} />
            <Huecos
                ordenUsuario={ordenUsuario}
                feedback={feedback || []} // Show feedback only after checking or game ends
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleDragStart={handleDragStart}
            />

            <button onClick={handleCheck} className="comprobar-btn">Comprobar</button>
            {mensaje && <button onClick={reiniciarJuego} className="reiniciar-btn">Reiniciar</button>}
        </div>
    );
};

export default OrderSongsGame;