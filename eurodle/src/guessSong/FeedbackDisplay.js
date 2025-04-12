import React from "react"
import 'bootstrap/dist/css/bootstrap.css';

const FeedbackDisplay = ({ fallos, acertado, cancionCorrecta }) => {
    return (
        <div className="feedback-display">
            <h2>Fallos</h2>

            {fallos.length === 0 ? (
                <p>No hay fallos aún.</p>
            ) : (
                <div>
                    <p className="alert alert-dark d-inline-block">
                    {fallos.length} / 7
                    </p>

                    {!acertado && 7 - fallos.length > 0 ? (
                        <> Has fallado, sigue intentándolo. Te quedan {7- fallos.length} intentos</>
                    ) : acertado ? (
                        <> ¡Enhorabuena! Has acertado la canción.</>
                    ) : (
                        <> Te has quedado sin intentos. 😢 La canción era: {cancionCorrecta?.song_name}</>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeedbackDisplay;
