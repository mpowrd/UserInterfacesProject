import React from 'react';
import { useTranslation } from 'react-i18next';

import "./OrderSongsGame.css"

const ResultadoPopUp = ({ tipo, mensajePrincipal, mensajeSecundario, onClose, onRestart }) => {
    const { t } = useTranslation(['orderSongs', 'common']);

    if (!mensajePrincipal) {
        return null; // No mostrar nada si no hay mensaje
    }

    const esVictoria = tipo === 'victoria';
    const popUpClass = esVictoria ? 'popup-victoria' : 'popup-derrota';
    const titulo = esVictoria ? t('orderSongs:results.winTitle') : t('orderSongs:results.loseTitle');

    return (
        <div className="resultado-popup-overlay">
            <div className={`resultado-popup-content ${popUpClass}`}>
                <h2>{titulo}</h2>
                <p className="mensaje-principal">{mensajePrincipal}</p>
                {mensajeSecundario && (
                    <p className="mensaje-secundario">{mensajeSecundario}</p>
                )}
                <div className="popup-botones">
                    <button onClick={onRestart} className="popup-boton-reiniciar">
                        {t('orderSongs:buttons.restart')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultadoPopUp;