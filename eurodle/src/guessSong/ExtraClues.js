import React from "react";
import YouTubePlayer from './YouTubePlayer'; // Adjust the import path

const ExtraClues = ({ songData, fallos, acertado }) => {
    if (!songData) return null;

    const minStart = 6;
    const startTime = Math.floor(Math.random() * (100 - minStart)) + minStart;

    // Extract video ID from YouTube URL
    const getVideoId = (url) => {
        if (!url) return '';
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/i);
        return match && match[1] ? match[1] : '';
    };

    const videoId = getVideoId(songData.youtube_url);

    const pistasDisponibles = [

        `Ranking final: ${"la canción quedó en el puesto "+songData.final_place}`,

        `${"la canción quedó" + (songData.paisAbajo==="Desconocido"? "" : " por encima de " + songData.paisAbajo) +
        (songData.paisAbajo==="Desconocido" || songData.paisArriba==="Desconocido"? "" : " y ") +
        (songData.paisArriba==="Desconocido"? "" : "y por debajo de " + songData.paisArriba)}`,

        `${"El idioma del tema es: " + songData.language + " y el género: " + songData.style}`,

        `El nombre de la canción empieza con la letra: ${songData.song_name?.charAt(0)} y termina con: ${songData.song_name?.slice(-1)}`,

        `Fragmento de la letra: ${obtenerFragmentoOptimizado(songData.lyrics)}`,

        `${"Nombre del/los artista/s o del grupo: " + songData.artist_name}`,

        { type: 'component', component: <YouTubePlayer videoId={videoId} startTime={startTime} /> },
    ];

    function obtenerFragmentoOptimizado(texto, minLong = 70, maxLong = 100, intentos = 10) {
        const limpio = texto
            .replace(/(\\n\s*){1,}/g, ", ")  // Agrupa 1 o más \n seguidos como una coma
            .replace(/\s+/g, " ")            // Normaliza los espacios
            .trim();
        const palabras = limpio.split(" ");
        const totalPalabras = palabras.length;

        for (let i = 0; i < intentos; i++) {
            let inicio = Math.floor(Math.random() * totalPalabras);
            let fragmento = "";
            let j = inicio;

            while (j < totalPalabras && (fragmento + palabras[j]).length <= maxLong) {
                fragmento += (fragmento ? " " : "") + palabras[j];
                j++;
            }

            if (fragmento.length >= minLong) {
                if(fragmento[fragmento.length-1] === ",") fragmento = fragmento.slice(0, fragmento.length-1)
                return '"' + fragmento + '..."';
            }
        }

        // Fallback: si no se encontró un fragmento bueno tras varios intentos
        let fragmento = texto.slice(0, maxLong).split(" ").slice(0, -1).join(" ");
        if(fragmento[fragmento.length-1] === ",") fragmento = fragmento.slice(0, fragmento.length-1)
        return '"' + fragmento + '..."';
    }

    return (
        <div className="extra-clues">
            <h2>Pistas adicionales</h2>
            <ul className="extra-clues-list">
                {pistasDisponibles.map((pista, index) => {
                    const desbloqueada = fallos.length > index || acertado;
                    return (
                        <li key={index} className={`clue-block ${desbloqueada ? "unlocked" : "locked"}`}>
                            {desbloqueada ? (
                                <>
                                    🔓 {pista.type === 'component' ? pista.component : pista}
                                </>
                            ) : (
                                `🔒 Pista ${index + 1}`
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ExtraClues;