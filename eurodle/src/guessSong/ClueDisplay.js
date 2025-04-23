import React from "react";
import { useTranslation } from 'react-i18next'; // <-- Añadir

const ClueDisplay = ({ pistas }) => {
    const { t } = useTranslation('guessSong'); // <-- Añadir (namespace 'guessSong')

    // Helper function to translate comparison results
    const translateComparison = (comparisonText) => {
        switch (comparisonText) {
            case "✅":
            case "✔️ Correcto": // Asegúrate de que coincida con lo que genera handleGuess
                return t('clues.comparison.correct');
            case "❌":
                return t('clues.comparison.incorrect');
            case "🔼 Busca más reciente":
                return t('clues.comparison.yearHigher');
            case "🔽 Busca más antiguo":
                return t('clues.comparison.yearLower');
            case "🔼 Ranking más alto":
                return t('clues.comparison.rankHigher');
            case "🔽 Ranking más bajo":
                return t('clues.comparison.rankLower');
            default:
                return comparisonText; // Devuelve el texto original si no hay coincidencia
        }
    };


    return (
        <div className="clue-display">
            {/* Línea ~6: Cambiar h2 */}
            <h2>{t('clues.title')}</h2>

            {pistas.length === 0 ? (
                // Línea ~9: Cambiar p
                <p>{t('clues.noClues')}</p>
            ) : (
                <table className="pistas-table">
                    <thead>
                    <tr>
                        {/* Líneas ~14-18: Cambiar th */}
                        <th>{t('clues.headers.song')}</th>
                        <th>{t('clues.headers.artist')}</th>
                        <th>{t('clues.headers.country')}</th>
                        <th>{t('clues.headers.year')}</th>
                        <th>{t('clues.headers.rank')}</th>
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
    );
};

export default ClueDisplay;