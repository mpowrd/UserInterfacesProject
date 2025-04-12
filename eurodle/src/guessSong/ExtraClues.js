import React from "react";

const ExtraClues = ({ songData, fallos }) => {
    if (!songData) return null;

    const pistasDisponibles = [

        `${"El idioma del tema es: " + songData.language + " y el género: " + songData.style}`,

        `Ranking final: ${"la canción quedó en el puesto "+songData.final_place+

        (songData.paisAbajo? " por encima de " + songData.paisAbajo : "") +
        (songData.paisAbajo && songData.paisArriba? " y " : "") +
        (songData.paisArriba?  "por debajo de " + songData.paisArriba : "") }`,

        `${"Nombre del/los artista/s o del grupo: " + songData.artist_name}`,

        `El nombre de la canción empieza con la letra: ${songData.song_name?.charAt(0)} y termina con: ${songData.song_name?.slice(-1)}`,

        Math.random() > 0.5
            ? `Año: ${songData.year}`
            : `País: ${songData.country}`,
    ];

    const pistasParaMostrar = pistasDisponibles.slice(0, fallos.length);

    return (
        <div className="extra-clues">
            <h2>Pistas adicionales</h2>
            <ul className="extra-clues-list">
                {pistasDisponibles.map((pista, index) => {
                    const desbloqueada = fallos.length > index;
                    return (
                        <li key={index} className={`clue-block ${desbloqueada ? "unlocked" : "locked"}`}>
                            {desbloqueada ? `🔓 ${pista}` : `🔒 Pista ${index + 1}`}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ExtraClues;