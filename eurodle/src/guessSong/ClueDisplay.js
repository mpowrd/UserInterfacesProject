import React from "react";
import { useTranslation } from 'react-i18next'; // <-- Añadir

const ClueDisplay = ({ pistas, noYear }) => {
    const { t } = useTranslation('guessSong'); // <-- Añadir (namespace 'guessSong')

    // Helper function to translate comparison results
    const translateComparison = (comparisonText) => {
        switch (comparisonText) {
            case "🔼 year":
                return t('clues.comparison.yearHigher');
            case "🔽 year":
                return t('clues.comparison.yearLower');
            case "🔼 ranking":
                return t('clues.comparison.rankHigher');
            case "🔽 ranking":
                return t('clues.comparison.rankLower');
            default:
                return comparisonText; // Devuelve el texto original si no hay coincidencia
        }
    };


    return (
        <div className="clue-display">
            <div className="div-pistas-table">
            <h2 className='cluesTitle'>{t('clues.title')}</h2>

            {pistas.length === 0 ? (
                // Línea ~9: Cambiar p
                <p style={{marginLeft: '1%' ,color:"#888888"}}>{t('clues.noClues')}</p>
            ) : (

                    <table className="pistas-table">
                        <thead>
                        <tr>
                            {/* Líneas ~14-18: Cambiar th */}
                            <th><span>{t('clues.headers.song')}</span></th>
                            <th><span>{t('clues.headers.artist')}</span></th>
                            <th><span>{t('clues.headers.country')}</span></th>
                            {!noYear && <th><span>{t('clues.headers.year')}</span></th>}
                            <th><span>{t('clues.headers.rank')}</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        {pistas.map((pista, index) => (
                            <tr key={index}>
                                <td><p><strong>{pista.intento.song_name}</strong></p>
                                    <p>{pista.intento.year + " — " + pista.intento.country}</p></td>
                                {/* Línea ~29: Traducir el resultado de la pista */}
                                {pista.pistas.map((p, idx) => (
                                    <td key={idx}>{translateComparison(p.acertado)}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

            )}
            </div>
        </div>
    );
};

export default ClueDisplay;