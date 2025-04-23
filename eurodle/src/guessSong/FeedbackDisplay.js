import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useTranslation } from 'react-i18next'; // <-- Añadir

const FeedbackDisplay = ({ fallos, acertado, cancionCorrecta, totalIntentos }) => {
    const { t } = useTranslation('guessSong'); // <-- Añadir (namespace 'guessSong')

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
        <div className="feedback-display">
            {/* Línea ~21: Cambiar h2 */}
            <h2>{t('feedback.title')}</h2>

            {intentosFallidos === 0 && !acertado ? ( // Mostrar solo si no hay fallos Y no se ha acertado
                // Línea ~25: Cambiar p
                <p>{t('feedback.noErrors')}</p>
            ) : (
                <div>
                    <p className="alert alert-dark d-inline-block">
                        {intentosFallidos} / {totalIntentos}
                    </p>
                    {/* Mostrar el mensaje de estado generado */}
                    {statusMessage && <p style={{ marginLeft: '10px', display: 'inline-block' }}>{statusMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default FeedbackDisplay;