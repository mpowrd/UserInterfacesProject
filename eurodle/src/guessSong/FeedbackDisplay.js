import React from "react"
import 'bootstrap/dist/css/bootstrap.css';

const FeedbackDisplay = ({ fallos, acertado, cancionCorrecta, totalIntentos }) => {
    return (
        <div className="feedback-display">
            <h2>Fallos</h2>

            {fallos.length === 0 ? (
                <p>No hay fallos aún.</p>
            ) : (
                <div>
                    <p className="alert alert-dark d-inline-block">
                    {fallos.length} / {totalIntentos}
                    </p>

                    {!acertado && totalIntentos - fallos.length > 0 ? (
                        <> Has fallado, sigue intentándolo. Te quedan {totalIntentos- fallos.length} intentos</>
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
