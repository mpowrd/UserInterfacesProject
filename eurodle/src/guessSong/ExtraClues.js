import React from "react";

const ExtraClues = ({ songData, fallos }) => {
    if (!songData) return null;

    const pistasDisponibles = [
        `Ranking final: ${songData.final_place}`,
        `Cantante: ${songData.artist_name}`,
        `Año: ${songData.year}`,
        `País: ${songData.country}`,
        `Empieza con: ${songData.song_name?.charAt(0)} y termina con: ${songData.song_name?.slice(-1)}`
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