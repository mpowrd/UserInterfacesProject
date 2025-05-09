import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useTranslation } from 'react-i18next'; // <-- Añadir
import HeartDisplay from "../HeartDisplay";

const FeedbackDisplay = ({ fallos, acertado, cancionCorrecta, totalIntentos }) => {
    const { t } = useTranslation('common'); // <-- Añadir (namespace 'guessSong')

    const intentosFallidos = fallos.length;
    const intentosQueQuedan = totalIntentos - intentosFallidos;

    let statusMessage = '';
    if (acertado) {
        // Línea ~11 (lógica): Mensaje de acierto
        statusMessage = t('feedback.congrats');
    } else if (intentosQueQuedan <= 0) {
        // Línea ~13 (lógica): Mensaje de derrota
        statusMessage = t('feedback.gameOver', { songName: cancionCorrecta?.song_name || '?' });
    } else if (intentosFallidos > 0) {
        // Línea ~15 (lógica): Mensaje de intentos restantes (con plural)
        statusMessage = t('feedback.attemptsLeft', { count: intentosQueQuedan });
    }

    return (
        <div className="feedback-display" style={{ marginTop: 20 }}>
            <h3 className="feedback-text">
                <HeartDisplay intentosFallidos={intentosFallidos} totalIntentos={totalIntentos}></HeartDisplay>
            </h3>
        </div>
    );
};

export default FeedbackDisplay;