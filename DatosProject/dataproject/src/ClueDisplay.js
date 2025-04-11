import React from 'react';

// Podrías tener componentes específicos para Audio/Video si son complejos

// import AudioPlayer from './AudioPlayer';

// import VideoPlayer from './VideoPlayer';

function ClueDisplay({ songData, revealedClues, gameStatus }) {

    // Helper para no repetir la condición

    const isClueRevealed = (clueNumber) => revealedClues.includes(clueNumber);

    // Muestra todas las pistas si el juego terminó (opcional)

    const showAll = gameStatus === 'lost' || gameStatus === 'won';

    // Función para generar el contenido de cada pista

    const getClueContent = (clueNumber) => {

        switch (clueNumber) {

            case 1:

                return Letra: "${songData.letra.substring(0, 30)}..."; // Muestra un trozo

            case 2:

                return Quedó ${songData.puesto}º (Entre ${songData.paisArriba} y ${songData.paisDebajo});

            case 3:

                // Asegúrate que enlaceAudio sea un fragmento corto y reproducible directamente

                // Idealmente usar <AudioPlayer src={songData.enlaceAudio} /> si tienes un componente custom

                return songData.enlaceAudio ? <audio controls src={songData.enlaceAudio} style={{maxWidth: '100%'}}><a href={songData.enlaceAudio}>Escuchar audio</a></audio> : 'Audio no disponible';

            case 4:

                // Usa el enlace de "embed" de YouTube para iframes

                const embedUrl = songData.enlaceActuacion?.replace("watch?v=", "embed/");

                // Idealmente usar <VideoPlayer src={embedUrl} />

                return embedUrl ? <iframe width="100%" height="150" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : 'Video no disponible';

            case 5:

                return Cantante: ${songData.cantante};

            case 6:

                const firstLetter = songData.nombre.charAt(0);

                const lastLetter = songData.nombre.charAt(songData.nombre.length - 1);

                return Título empieza por '${firstLetter}' y acaba por '${lastLetter}';

            case 7:

                // Revelar año o país aleatoriamente

                const revealYear = Math.random() < 0.5;

                return revealYear ? Año: ${songData.anyo} : País: ${songData.pais};

            default:

                return null; // No debería pasar

        }

    };

    return (

        <div className="clues-section">

            <h2>Pistas</h2>

            <ul className="clue-list">

                {[1, 2, 3, 4, 5, 6, 7].map(clueNum => (

                    (isClueRevealed(clueNum) || showAll) ? // Muestra si está revelada O si el juego terminó

                        <li key={clueNum} className="clue-item revealed">

                            informacion de la pista {clueNum}:
                            {songData === undefined || songData === null || songData === ""
                                ? " nada que mostrar" : getClueContent(clueNum)}

                        </li>

                        :

                        <li key={clueNum} className="clue-item hidden">

                            Pista {clueNum} (Bloqueada)

                        </li>

                ))}

            </ul>

        </div>

    );

}

export default ClueDisplay;