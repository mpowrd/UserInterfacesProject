import React, {useState} from "react";
import YouTubePlayer from './YouTubePlayer';
import { useTranslation } from 'react-i18next';

const ExtraClues = ({ songData, fallos, acertado }) => {
    const { t } = useTranslation('guessSong');

    const [videoDisplayed, setVideoDisplayed] = useState(false);

    if (!songData) return null;

    const minStart = 6;
    const startTime = Math.floor(Math.random() * (100 - minStart)) + minStart;

    // Extract video ID from YouTube URL
    const getVideoId = (url) => {
        if (!url) return '';
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/i);
        return match && match[1] ? match[1] : '';
    };

    const videoId = getVideoId(songData.youtube_url);

    const pistasDisponibles = [

        t('extraClues.clueTemplates.rank', { rank: songData.final_place || '?' }),

        (() => {
            const paisAbajo = songData.paisAbajo === "Desconocido" ? t('extraClues.clueTemplates.neighboursParts.unknown') : songData.paisAbajo;
            const paisArriba = songData.paisArriba === "Desconocido" ? t('extraClues.clueTemplates.neighboursParts.unknown') : songData.paisArriba;
            const partBelow = paisAbajo !== t('extraClues.clueTemplates.neighboursParts.unknown') ? t('extraClues.clueTemplates.neighboursParts.below', { country: paisAbajo }) : "";
            const partAbove = paisArriba !== t('extraClues.clueTemplates.neighboursParts.unknown') ? t('extraClues.clueTemplates.neighboursParts.above', { country: paisArriba }) : "";
            const separator = partBelow && partAbove ? t('extraClues.clueTemplates.neighboursParts.separator') : "";

            return t('extraClues.clueTemplates.neighbours', { below: partBelow, separator: separator, above: partAbove });
        })(),

        t('extraClues.clueTemplates.langStyle', { language: songData.language || '?', style: songData.style || '?' }),

        t('extraClues.clueTemplates.letters', { firstLetter: songData.song_name?.charAt(0) || '?', lastLetter: songData.song_name?.slice(-1) || '?' }),

        t('extraClues.clueTemplates.lyrics', { fragment: obtenerFragmentoOptimizado(songData.lyrics || '') }),

        t('extraClues.clueTemplates.artist', { artistName: songData.artist_name || '?' }),

        { type: 'component', component: <YouTubePlayer videoId={videoId} startTime={startTime} setVideoDisplayed={setVideoDisplayed}/> },

    ];

    function obtenerFragmentoOptimizado(texto, minLong = 70, maxLong = 100, intentos = 10) {
        const limpio = texto
            .replace(/(\\n\s*){1,}/g, ", ")  // Agrupa 1 o más \n seguidos como una coma
            .replace(/\s+/g, " ")            // Normaliza los espacios
            .trim();
        const palabras = limpio.split(" ");
        const totalPalabras = palabras.length;

        for (let i = 0; i < intentos; i++) {
            let inicio = Math.floor(Math.random() * totalPalabras);
            let fragmento = "";
            let j = inicio;

            while (j < totalPalabras && (fragmento + palabras[j]).length <= maxLong) {
                fragmento += (fragmento ? " " : "") + palabras[j];
                j++;
            }

            if (fragmento.length >= minLong) {
                if(fragmento[fragmento.length-1] === ",") fragmento = fragmento.slice(0, fragmento.length-1)
                return '"' + fragmento + '..."';
            }
        }

        // Fallback: si no se encontró un fragmento bueno tras varios intentos
        let fragmento = texto.slice(0, maxLong).split(" ").slice(0, -1).join(" ");
        if(fragmento[fragmento.length-1] === ",") fragmento = fragmento.slice(0, fragmento.length-1)
        return '"' + fragmento + '..."';
    }

    return (
        <div className="extra-clues">
            <h2>{t('extraClues.title')}</h2>
            <ul className="extra-clues-list">
                {pistasDisponibles.map((pista, index) => {
                    const desbloqueada = fallos.length > index || acertado;
                    const pistaIndex = index + 1;
                    return (
                        <li key={index} className={`clue-block ${desbloqueada ? "unlocked" : "locked"}`}>
                            {desbloqueada ? (
                                <>
                                    {/* Línea ~90: Añadir prefijo traducido */}
                                    {t('extraClues.unlockedPrefix')}
                                    {/* Línea ~91: Usar texto traducido si el video se completó */}
                                    {pista.type === 'component' ? (videoDisplayed === false ? pista.component : t('extraClues.videoCompleted')) : pista}
                                </>
                            ) : (
                                // Línea ~95: Usar texto traducido para pista bloqueada
                                t('extraClues.locked', { index: pistaIndex })
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ExtraClues;