import React from 'react';
import { useTranslation } from 'react-i18next';

const HeartDisplay = ({ intentosFallidos, totalIntentos }) => {
    const { t } = useTranslation(['guessSong', 'common']);

    // Calculamos el número de corazones (cada uno vale 2 intentos)
    const numHearts = Math.ceil(totalIntentos / 2);
    const vidasRestantes = totalIntentos - intentosFallidos;

    // Función que calcula la imagen según el índice

    const getHeartImage = (vidasQueRepresenta) => {
        if (vidasQueRepresenta >= 2) {
            return "/corazonEuroEntero.png";
        } else if (vidasQueRepresenta === 1) {
            return "/corazonEuroMitadIzquierda.png";
        } else {
            return "/corazonEuroVacio.png";
        }
    };

    return (
        <div id="hearts">
            {Array.from({ length: numHearts }, (_, i) => {
                const index = i; // de izquierda a derecha
                const vidasQueRepresenta = Math.max(0, Math.min(2, vidasRestantes - index * 2));
                const vidasTotales = Math.max(0, vidasRestantes - index * 2);

                let alt = t('aria.lives_plural', { count: vidasTotales });
                if(vidasQueRepresenta === 1) alt = t('aria.lives', { count: vidasTotales });
                // console.log(`Corazón ${index + 1}: ${alt}`);

                return (
                    <img
                        key={i}
                        id={`heart${index}`}
                        className="heart-HP"
                        src={getHeartImage(vidasQueRepresenta)}
                        alt={alt}
                    />
                );
            })}

            <span className="heart-text">
                {intentosFallidos}/{totalIntentos} {t('guessSong:feedback.tries')}
            </span>
        </div>
    );
};

export default HeartDisplay;
