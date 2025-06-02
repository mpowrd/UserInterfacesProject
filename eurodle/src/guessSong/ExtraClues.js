import React, {useState} from "react";
import YouTubePlayer from './YouTubePlayer';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const ExtraClues = ({ songData, fallos, acertado }) => {


    const { t } = useTranslation('guessSong');

    const [videoDisplayed, setVideoDisplayed] = useState(false);

    const [pistasDesbloqueadas, setPistasDesbloqueadas] = useState([]);

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
            const partBelow = songData.paisAbajo !== t('extraClues.clueTemplates.neighboursParts.unknown') ? t('extraClues.clueTemplates.neighboursParts.below', { country: songData.paisAbajo }) : "";
            const partAbove = songData.paisArriba !== t('extraClues.clueTemplates.neighboursParts.unknown') ? t('extraClues.clueTemplates.neighboursParts.above', { country: songData.paisArriba }) : "";
            const separator = partBelow && partAbove ? t('extraClues.clueTemplates.neighboursParts.separator') : "";

            return t('extraClues.clueTemplates.neighbours', { below: partBelow, separator: separator, above: partAbove });
        })(),

        t('extraClues.clueTemplates.langStyle', { language: songData.language || '?', style: songData.style || '?' }),

        t('extraClues.clueTemplates.letters', { firstLetter: songData.song_name?.charAt(0) || '?', lastLetter: songData.song_name?.slice(-1) || '?' }),

        t('extraClues.clueTemplates.lyrics', { fragment: obtenerFragmentoOptimizado(songData.lyrics || '') }),

        t('extraClues.clueTemplates.artist', { artistName: songData.artist_name || '?' }),

        { type: 'component', component: <YouTubePlayer videoId={videoId} startTime={startTime} setVideoDisplayed={setVideoDisplayed}/> },

    ];

    useEffect(() => {
        if(acertado){
            setPistasDesbloqueadas( pistasDisponibles.reverse());
        }else{
            setPistasDesbloqueadas( pistasDisponibles.slice(0, (fallos.length                                                                                                                                                   )).reverse());
        }
    }, [fallos, acertado, videoDisplayed]);

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
            <p>{pistasDesbloqueadas.length === 0 ? t('clues.noClues') : ""}</p>
            <ul className="extra-clues-list">
                {pistasDesbloqueadas.map((pista, index) => {
                    return (
                        <li key={index} className={`clue-block unlocked`}>
                            <>
                                {/* Línea ~90: Añadir prefijo traducido */}
                                {t('extraClues.unlockedPrefix')}
                                {/* Línea ~91: Usar texto traducido si el video se completó */}
                                {pista.type === 'component' ? (videoDisplayed === false ? pista.component : t('extraClues.videoCompleted')) : pista}
                            </>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ExtraClues;