// ClueItem.js
import React from "react";

const ClueItem = ({ intento, pistas }) => {
    return (
        <div className="clue-item">
            <h3>{intento.song_name}</h3>

            <ul>
                {pistas.map((pista, index) => (
                    <li key={index}>
                        {pista.atributo}: {pista.acertado ? "✔️" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClueItem;
