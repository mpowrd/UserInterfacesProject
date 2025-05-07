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

    const getHeartImage = (index) => {

        const offset = index-1;
        // 0 1 2 3 4 5 6 7 8

        // 4        0 >= 1+1-1 // 0 === 1-1
        // 3
        // 2
        // 1*
        if (intentosFallidos >= index + 1 + offset) {
            return "/corazonEuroVacio.png"; // Corazón vacío
        } else if (intentosFallidos === index + offset) {
            return "/corazonEuroMitadIzquierda.png"; // Mitad izquierda
        } else {
            return "/corazonEuroEntero.png"; // Corazón entero
        }
    };

    return (
        <div className="feedback-display" style={{ marginTop: 20 }}>
            <h3 className="feedback-text">
                <div id="hearts">
                    <img id="heart3" className="heart-HP" src={getHeartImage(4)} />
                    <img id="heart2" className="heart-HP" src={getHeartImage(3)} />
                    <img id="heart1" className="heart-HP" src={getHeartImage(2)} />
                    <img id="heart0" className="heart-HP" style={{ marginRight: 10 }} src={getHeartImage(1)} />
                    {intentosFallidos}/{totalIntentos} {t('feedback.tries')}
                </div>

            </h3>
        </div>
    );
};

export default FeedbackDisplay;