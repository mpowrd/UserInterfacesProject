import React from "react";
import { useTranslation } from 'react-i18next';

const Huecos = ({ ordenUsuario, feedback, handleDrop, handleDragOver, handleDragStart }) => {
    const { t } = useTranslation('orderSongs');

    const translateFeedback = (fb) => {
        if (fb === "✔️") return t('feedback.correct');
        if (fb === "❌") return t('feedback.incorrect');
        return fb; // Devuelve original si no coincide
    };

    return (
        <div className="huecos">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="hueco"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                >
                    <span className="puesto">{t('slots.position', { position: index + 1 })}</span>
                    {ordenUsuario[index] ? (
                        <div
                            className="hueco-contenido"
                            draggable
                            onDragStart={(e) => handleDragStart(e, ordenUsuario[index], index)}
                        >
                            {ordenUsuario[index]}
                            {feedback[index] && <span>{translateFeedback(feedback[index])}</span>}
                        </div>
                    ) : (
                        <span>{t('slots.placeholder')}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Huecos;
