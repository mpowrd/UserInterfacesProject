import React, {useEffect, useRef, useState} from "react";
import MapPaths from "../assets/MapPaths";
import Papa from "papaparse";
import { ReactSVGPanZoom,
    INITIAL_VALUE,
    TOOL_AUTO,
    TOOL_NONE,
    fitToViewer,
        fitSelection} from 'react-svg-pan-zoom';

import "../css/GuessSingerCountry.css"
import HeartDisplay from "../HeartDisplay";
import {useTranslation} from "react-i18next";

const InteractiveMap = () => {

    const { t } = useTranslation(['guessCountry']);

    const [canciones, setCanciones] = useState([]);

    const [cancionSelect, setCancionSelect] = useState(null);

    // Estados para almacenar los paises seleccionados erroneamente
    // Con css los pintamos de rojo en la pantalla
    const [wrongCountries, setWrongCountries] = useState([]);

    const [resultadoMensaje, setResultadoMensaje] = useState(t("game.hint", { arrow: '' }));

    // Estados para almacenar el país seleccionado
    const [hoveredCountry, setHoveredCountry] = useState(null);

    // Estado para identificar el fin de una partida
    const [finPartida, setFinPartida] = useState(false);

    // Número de fallos realizados
    const [fallos, setFallos] = useState(0);
    const intentos = 6;

    // Verificar la posición del móvil
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth); //como prueba la altura de la pantalla (en modo vertical)

    const [ganado, setGanado] = useState(false);

    useEffect(() => {
        // Cargamos las caciones del csv al iniciar
        Papa.parse("/canciones.csv", {
            header: true,
            download: true,
            complete: (results) => {
                /*
                Vamos a filtrar la cancion por el atributo song_name asegurandonos que
                todos los campos clave existan y no estén vacíos.
                 */
                const listaCanciones = results.data.filter(c =>
                    c.artist_name && c.artist_name.trim() !== "" &&
                    c.country && c.country.trim() !== ""
                );

                setCanciones(listaCanciones);

                // Elegimos una canción aleatoria solo entre las válidas. Esta será la canción a adivinar
                const randomIndex = Math.floor(Math.random() * listaCanciones.length);
                const cancionSeleccionada = listaCanciones[randomIndex];

                // const cancionArriba = results.data.filter(c =>
                //     c.final_place && parseInt(c.final_place.trim()) === parseInt(cancionSeleccionada.final_place) - 1 &&
                //     c.year && parseInt(c.year.trim()) === parseInt(cancionSeleccionada.year)
                // );
                //
                // const cancionAbajo = results.data.filter(c =>
                //     c.final_place && parseInt(c.final_place.trim()) === parseInt(cancionSeleccionada.final_place) + 1 &&
                //     c.year && parseInt(c.year.trim()) === parseInt(cancionSeleccionada.year)
                // );
                //
                // cancionSeleccionada.paisArriba = cancionArriba.length === 0 ? "Desconocido" : cancionArriba[0].country;
                // cancionSeleccionada.paisAbajo = cancionAbajo.length === 0 ? "Desconocido" : cancionAbajo[0].country;

                setCancionSelect(cancionSeleccionada);
            },
            error: (error) => {
                console.error("Error al cargar el CSV:", error);
            }
        });

        // Renderizado de advertencia en caso de jugar en modo móvil
        //Crea dos eventos que escuchan el cambio de tamaño de ventana
        const handleResize = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        window.addEventListener("resize", handleResize); //controla el cambio de tamaño en la ventana
        window.addEventListener("orientationchange", handleResize); // evento específico de móviles cuando se gira el dispositivo

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };


    }, []);

    var paisSeleccionado;

    const handleMouseEnter = (event) => {
        if (finPartida) return;

        const country = event.target;
        const name = country.getAttribute("name");
        setHoveredCountry(country.getAttribute("name"));

        paisSeleccionado = hoveredCountry;

        country.setAttribute("stroke", "yellow");
        country.setAttribute("stroke-width", "1.5");
    };

    const handleMouseLeave = (event) => {
        const country = event.target;
        const name = country.getAttribute("name");

        if (!wrongCountries.includes(name)) {
            if(!ganado) {setHoveredCountry(null);}
            country.setAttribute("stroke", "black"); // Restaurar borde original
            country.setAttribute("stroke-width", "1");
            country.removeAttribute("class");
        }
    };

    const cantanteAdivinar= {
        nameCantante: cancionSelect?.artist_name,
        nameCountry: cancionSelect?.country,
    }



    function getCentroid(path) {
        // const bbox = path.getBBox();
        // return {
        //     x: bbox.x + bbox.width / 2,
        //     y: bbox.y + bbox.height / 2,
        // };
        const bbox = path.getBBox();

        // Crear un punto en el centro del bounding box
        const center = path.ownerSVGElement.createSVGPoint();
        center.x = bbox.x + bbox.width / 2;
        center.y = bbox.y + bbox.height / 2;

        // Obtener la matriz de transformación del nodo
        const matrix = path.getCTM();

        // Aplicar la transformación al punto
        const transformed = center.matrixTransform(matrix);

        return {
            x: transformed.x,
            y: transformed.y
        };
    }

    function getDirectionWithArrow(from, to) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const adjusted = (angle + 360) % 360;

        if (adjusted >= 337.5 || adjusted < 22.5) return {dir: "Este", arrow: "➡️"};
        if (adjusted < 67.5) return {dir: "Sureste", arrow: "↘️"};
        if (adjusted < 112.5) return {dir: "Sur", arrow: "⬇️"};
        if (adjusted < 157.5) return {dir: "Suroeste", arrow: "↙️"};
        if (adjusted < 202.5) return {dir: "Oeste", arrow: "⬅️"};
        if (adjusted < 247.5) return {dir: "Noroeste", arrow: "↖️"};
        if (adjusted < 292.5) return {dir: "Norte", arrow: "⬆️"};
        if (adjusted < 337.5) return {dir: "Noreste", arrow: "↗️"};
    }

    const getIdByName = (name) => {
        const element = document.querySelector(`path[name="${name}"]`);
        return element ? element.id : null;
    };

    function compararPaises(paisSeleccionado, paisAdivinar) {
        const idSeleccionado = getIdByName(paisSeleccionado);
        const idAdivinar = getIdByName(paisAdivinar);

        const paisSelected = document.getElementById(idSeleccionado);
        const paisAdivin = document.getElementById(idAdivinar);


        if (!paisSelected || !paisAdivin) {
            console.warn("Países no encontrados");
            return;
        }

        //const paisSelected = paisesList[0].path;
        //const paisAdivin = adivinarList[0].path;

        const centroDesde = getCentroid(paisSelected);
        const centroHasta = getCentroid(paisAdivin);
        const {dir, arrow} = getDirectionWithArrow(centroDesde, centroHasta);

        const mensaje = t("game.hint", { arrow: arrow || '?' });

        setResultadoMensaje(mensaje);
    }



    const [selectedCountry,setSelectedCountry] = useState(null);

    const handleCountryClick = (event) => {
        if (finPartida) return;


        const countrySelectedID = event.target.getAttribute("id");
        const countrySelectedName = document.getElementById(countrySelectedID).getAttribute("name");
        setSelectedCountry(countrySelectedName);



        const country = event.target;

        if(paisAdivinado(countrySelectedName)){
            country.setAttribute("class", "correct-country");
        }
        else{
            country.setAttribute("class", "wrong-country");
        }

    };

    let nuevosFallos = fallos;

    function paisAdivinado(countrySelectedName) {
        if (countrySelectedName === cantanteAdivinar.nameCountry) {
            setResultadoMensaje(t("feedback.congrats"));
            setFinPartida(true); // Termina la partida actual

            setGanado(true);

            // Pinta el pais correcto de verde
            const idCorrecto = getIdByName(countrySelectedName);
            const paisCorrecto = document.getElementById(idCorrecto);


            if (paisCorrecto) {
                paisCorrecto.setAttribute("fill", "#2584d8");
            }

            return true;

        } else {
            compararPaises(countrySelectedName, cantanteAdivinar.nameCountry);
            setWrongCountries(prev => [...prev, countrySelectedName]);
            setFallos(fallos+1);
            return false;
        }

    }

    // Aqui se comprueba constantemente la condicion que hace que te has quedado
    // sin intentos y no has acertado
    useEffect(() => {
        if (fallos === intentos && !finPartida) {
            setFinPartida(true);
            setResultadoMensaje(t("feedback.gameOver",{country: cantanteAdivinar.nameCountry}));
        }
    }, [fallos]);

    const reiniciarJuego = () => {
        setFinPartida(false);
        const randomIndex = Math.floor(Math.random() * canciones.length);
        setCancionSelect(canciones[randomIndex]);
        setResultadoMensaje(t("game.hint", { arrow: '' }));
        setWrongCountries([]);
        setFallos(0);
        document.querySelectorAll("path").forEach(p => {
            p.removeAttribute("class");
            p.setAttribute("fill", "#cccccc");
            p.setAttribute("stroke", "black");
            p.setAttribute("stroke-width", "1");
        });
    };

    // VARIABLES CONST PARA EL ZOOM DEL MAPA
    const Viewer = useRef(null);
    const [tool, setTool] = useState(TOOL_AUTO); // permite pan y zoom automáticamente
    const [value, setValue] = useState(INITIAL_VALUE);

    useEffect(() => {
        if (Viewer.current) {
            const initialValue = Viewer.current.getValue();
            setValue(initialValue); // centra el contenido al cargar
        }
    }, []);

// npm install react-svg-pan-zoom

    return (

        <div className="guess-singer-country">
            {isPortrait ? (
                <div className="rotate-warning">

                    <h1 className="text-2xl font-semibold mb-2">{t("game.rotateTitle")}</h1>
                    <p className="text-md"> {t("game.rotateMessage")} </p>
                    <i className="bi bi-arrow-repeat fa-2x"></i>
                </div>


            ) : (
                <div className="guess-singer-country-container ">
                    <div className="guess-singer-country-header">
                        <h1 className="header">{t("game.title")}</h1>
                    </div>

                    <div className="guess-singer-country-singer">
                        <h2 className="singer">{cantanteAdivinar.nameCantante}</h2>
                    </div>
                    




                    <div className="hearts">
                        <HeartDisplay intentosFallidos={fallos} totalIntentos={intentos}/>
                    </div>
                    


                    <button onClick={reiniciarJuego} className="guess-singer-country-btn ">
                        {t("game.refresh")}
                    </button>



                    <p className="guidance-label__text">{t("game.informationMap")}</p>



                    <div className="guess-singer-country-mapa-wrapper">
                        <ReactSVGPanZoom
                            ref={Viewer}
                            width={window.innerWidth}
                            height={window.innerHeight}
                            tool={tool}
                            onChangeTool={setTool}
                            value={value}
                            onChangeValue={setValue}
                            detectAutoPan={false}
                            background="#fff"
                            toolbarProps={{position: 'none'}}
                            miniatureProps={{position: 'none'}}
                            scaleFactorMin={0.8}
                            scaleFactorMax={10}
                        >
                            <svg className="guess-singer-country-mapa"
                                 viewBox="0 0 800 446"// Ajusta según el tamaño del mapa
                                 xmlns="http://www.w3.org/2000/svg"
                            >
                                <MapPaths
                                    handleMouseEnter={handleMouseEnter}
                                    handleMouseLeave={handleMouseLeave}
                                    handleCountryClick={handleCountryClick}
                                />
                            </svg>
                        </ReactSVGPanZoom>

                    </div>

                    <div className="pista-pais">
                        <p className="guess-singer-country-message">{resultadoMensaje}</p>
                    </div>



                    <div className="pais-seleccionado">
                        <p className="guess-singer-country-country-selected">{t("game.arr")} {hoveredCountry}</p>
                    </div>






                </div>
            )}
        </div>
    );
};

export default InteractiveMap;