import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Header from "./Header";
import SettingsModal from "./SettingsModal";
import GuessForm from "./GuessForm";
import FeedbackDisplay from "./FeedbackDisplay";
import ClueDisplay from "./ClueDisplay";
import ExtraClues from "./ExtraClues";

const GuessSongGame = () => {
    const [canciones, setCanciones] = useState([]);
    const [cancionCorrecta, setCancionCorrecta] = useState(null);
    const [fallos, setFallos] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [intentosRestantes, setIntentosRestantes] = useState(7); // Puedes ajustarlo a tu gusto
    const [acertado, setAcertado] = useState(false);

    useEffect(() => {
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
                setCancionCorrecta(listaCanciones[randomIndex]);
            },
            error: (error) => {
                console.error("Error al cargar el CSV:", error);
            }
        });
    }, []);

    const handleGuess = (entrada) => {
        if (!entrada) return;

        const guess = canciones.find((c) => c.song_name.toLowerCase() === entrada.toLowerCase());

        if (!guess) {
            alert("Canción no encontrada. Asegúrate de seleccionar de la lista.");
            return;
        }

        // Verificar si el intento es correcto
        if (guess.song_name === cancionCorrecta.song_name) {
            setAcertado(true);
            alert("¡Correcto! Has adivinado la canción 🎉");
            return;
        } else {
            // Añadimos el fallo
            setFallos((prevFallos) => [...prevFallos, guess]);
            setIntentosRestantes((prev) => prev - 1);

            // Generar pistas
            const pistasDelIntento = [
                {
                    atributo: "Cantante",
                    acertado: guess.artist_name === cancionCorrecta.artist_name ? "✅" : "❌"
                },
                {
                    atributo: "País",
                    acertado: guess.country === cancionCorrecta.country ? "✅" : "❌"
                },
                {
                    atributo: "Año",
                    acertado: (() => {
                        const guessYear = parseInt(guess.year);
                        const correctYear = parseInt(cancionCorrecta.year);
                        if (guessYear === correctYear) return "✔️ Correcto";
                        if (guessYear < correctYear) return "🔼 Busca más reciente";
                        return "🔽 Busca más antiguo";
                    })()
                },
                {
                    atributo: "Ranking",
                    acertado: (() => {
                        const guessRank = parseInt(guess.final_place);
                        const correctRank = parseInt(cancionCorrecta.final_place);

                        if (guessRank === correctRank) return "✔️ Correcto";
                        if (guessRank > correctRank) return "🔼 Ranking más alto";
                        return "🔽 Ranking más bajo";
                    })()
                }
            ];



            setPistas((prevPistas) => [...prevPistas, { intento: guess, pistas: pistasDelIntento }]);
        }
    };

    const reiniciarJuego = () => {
        // Resetear todo
        const randomIndex = Math.floor(Math.random() * canciones.length);
        setCancionCorrecta(canciones[randomIndex]);
        setFallos([]);
        setPistas([]);
        setIntentosRestantes(7);
        setAcertado(false);
    };

    return (
        <div className="guess-song-game">
            <Header />

            <SettingsModal />

            <div className="contenido-principal">
                <h2>Fallos: {fallos.length} / 7</h2>
                {!acertado && intentosRestantes > 0 ? (
                    <p>Has fallado, sigue intentándolo. Te quedan {intentosRestantes} intentos</p>
                ) : acertado ? (
                    <p>¡Enhorabuena! Has acertado la canción.</p>
                ) : (
                    <p>Te has quedado sin intentos. 😢 La canción era: {cancionCorrecta?.song_name}</p>
                )}

                {/* Visualización de fallos */}
                <FeedbackDisplay fallos={fallos} />

                {/* Formulario de adivinanza */}
                {!acertado && intentosRestantes > 0 && (
                    <GuessForm canciones={canciones} onGuess={handleGuess} fallos={fallos} />
                )}
                {/* Botón para reiniciar cuando acabe el juego */}
                {(acertado || intentosRestantes <= 0) && (
                    <button onClick={reiniciarJuego} style={{ marginTop: "20px" }}>
                        Reiniciar Juego
                    </button>
                )}

                {/* Visualización de pistas */}
                <ClueDisplay pistas={pistas} />

                {/* Pistas adicionales progresivas */}
                <ExtraClues songData={cancionCorrecta} fallos={fallos} />


            </div>
        </div>
    );
};

export default GuessSongGame;
