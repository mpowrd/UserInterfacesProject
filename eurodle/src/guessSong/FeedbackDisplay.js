import React from "react";

const FeedbackDisplay = ({ fallos }) => {
    return (
        <div className="feedback-display">
            <h2>Fallos</h2>

            {fallos.length === 0 ? (
                <p>No hay fallos aún.</p>
            ) : (
                <ul>
                    {fallos.map((fallo, index) => (
                        <li key={index}>
                            {fallo.song_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedbackDisplay;
