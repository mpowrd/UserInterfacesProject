import React from "react";

const ClueDisplay = ({ pistas }) => {
    return (
        <div className="clue-display">
            <h2>Pistas</h2>

            {pistas.length === 0 ? (
                <p>Sin pistas todavía.</p>
            ) : (
                <table className="pistas-table">
                    <thead>
                    <tr>
                        <th>Canción</th>
                        <th>Cantante</th>
                        <th>País</th>
                        <th>Año</th>
                        <th>Ranking</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pistas.map((pista, index) => (
                        <tr key={index}>
                            <td><strong>{pista.intento.song_name}</strong></td>
                            {pista.pistas.map((p, idx) => (
                                <td key={idx}>{p.acertado}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClueDisplay;
