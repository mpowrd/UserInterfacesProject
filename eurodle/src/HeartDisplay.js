import React from 'react';
import { useTranslation } from 'react-i18next';

const HeartDisplay = ({ intentosFallidos, totalIntentos }) => {
    const { t } = useTranslation('common');

    // Calculamos el número de corazones (cada uno vale 2 intentos)
    const numHearts = Math.ceil(totalIntentos / 2);

    // Función que calcula la imagen según el índice
    const getHeartImage = (index) => {
        const offset = index - 1;

        if (intentosFallidos >= index + 1 + offset) {
            return "/corazonEuroVacio.png"; // Corazón vacío
        } else if (intentosFallidos === index + offset) {
            return "/corazonEuroMitadIzquierda.png"; // Mitad izquierda
        } else {
            return "/corazonEuroEntero.png"; // Corazón entero
        }
    };

    return (
        <div id="hearts">
            {Array.from({ length: numHearts }, (_, i) => (
                <img
                    key={i}
                    id={`heart${numHearts - 1 - i}`}
                    className="heart-HP"
                    src={getHeartImage(numHearts - i)}
                    style={i === numHearts-1 ? { marginRight: 10 } : {}}
                    alt={`${numHearts - i} vida${numHearts - i === 1 ? '' : 's'} restante`}
                />
            ))}
            <span className="heart-text">
              {intentosFallidos}/{totalIntentos} {t('tries')}
            </span>
        </div>
    );
};

export default HeartDisplay;
