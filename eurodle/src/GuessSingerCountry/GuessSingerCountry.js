import React, {useEffect, useRef, useState} from "react";
import MapPaths from "../assets/MapPaths";
import {useSettings} from "../SettingsProvider";
import Papa from "papaparse";

import "../css/GuessSingerCountry.css"
import "../css/daltonicMode.css";

const InteractiveMap = () => {

    const { daltonicMode } = useSettings();

    const [canciones, setCanciones] = useState([]);

    const [cancionSelect, setCancionSelect] = useState(null);

    // Estados para almacenar los paises seleccionados erroneamente
    // Con css los pintamos de rojo en la pantalla
    const [wrongCountries, setWrongCountries] = useState([]);

    const [resultadoMensaje, setResultadoMensaje] = useState("Pista: ");

    // Estados para almacenar el país seleccionado
    const [hoveredCountry, setHoveredCountry] = useState(null);

    // Estado para identificar el fin de una partida
    const [finPartida, setFinPartida] = useState(false);


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
    }, []);



    const handleMouseEnter = (event) => {
        if (finPartida) return;

        const country = event.target;
        const name = country.getAttribute("name");
        setHoveredCountry(country.getAttribute("name"));

        if (wrongCountries.includes(name)) {
            country.setAttribute("class", daltonicMode ? "wrong-country-daltonic" : "wrong-country");
        } else {
            country.setAttribute("stroke", "#ffcc00"); // Color del borde resaltado
            country.setAttribute("stroke-width", "2"); // Grosor del borde resaltado

        }
    };

    const handleMouseLeave = (event) => {
        const country = event.target;
        const name = country.getAttribute("name");

        if (!wrongCountries.includes(name)) {
            setHoveredCountry(null);
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
        const bbox = path.getBBox();
        return {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2,
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

        console.log("ID seleccionado:", idSeleccionado);
        console.log("ID a adivinar:", idAdivinar);

        if (!paisSelected || !paisAdivin) {
            console.warn("Países no encontrados");
            return;
        }

        //const paisSelected = paisesList[0].path;
        //const paisAdivin = adivinarList[0].path;

        const centroDesde = getCentroid(paisSelected);
        const centroHasta = getCentroid(paisAdivin);
        const {dir, arrow} = getDirectionWithArrow(centroDesde, centroHasta);

        const mensaje = `Pista: ${arrow}`;

        setResultadoMensaje(mensaje);
    }



    const [selectedCountry,setSelectedCountry] = useState(null);

    const handleCountryClick = (event) => {
        if (finPartida) return;

        const countrySelectedID = event.target.getAttribute("id");
        const countrySelectedName = document.getElementById(countrySelectedID).getAttribute("name");
        setSelectedCountry(countrySelectedName);

        const country = event.target;
        country.setAttribute("class", daltonicMode ? "wrong-country-daltonic" : "wrong-country");

        paisAdivinado(countrySelectedName);
    };

    function paisAdivinado(countrySelectedName) {
        if (countrySelectedName === cantanteAdivinar.nameCountry) {
            setResultadoMensaje("¡Correcto! Has adivinado el país.");
            setFinPartida(true); // Termina la partida actual

            // Pinta el pais correcto de verde
            const idCorrecto = getIdByName(countrySelectedName);
            const paisCorrecto = document.getElementById(idCorrecto);
            if (paisCorrecto) {
                paisCorrecto.setAttribute("fill", "#2584d8");
            }

        } else {
            compararPaises(countrySelectedName, cantanteAdivinar.nameCountry);
            setWrongCountries(prev => [...prev, countrySelectedName]);
        }
        // Condicion para guardar el pais incorrecto en estado wrongCountries
        if (countrySelectedName !== cantanteAdivinar.nameCountry) {
            setWrongCountries(prev => [...prev, countrySelectedName]);
        }

    }

    const reiniciarJuego = () => {
        setFinPartida(false);
        const randomIndex = Math.floor(Math.random() * canciones.length);
        setCancionSelect(canciones[randomIndex]);
        setResultadoMensaje("Pista: ");
        setWrongCountries([]);
        document.querySelectorAll("path").forEach(p => {
            p.removeAttribute("class");
            p.setAttribute("fill", "#cccccc");
            p.setAttribute("stroke", "black");
            p.setAttribute("stroke-width", "1");
        });
    };

    return (
        <div className={` ${daltonicMode ? "modo-daltonico" : "guess-singer-country-container"}`}>
                <h2 className="guess-singer-country-header">ADIVINA EL PAIS DEL CANTANTE</h2>

                    <h3 className="guess-singer-country-singer">Cantante: {cantanteAdivinar.nameCantante}</h3>
                    {/*<h3>{cantanteAdivinar.nameCountry}</h3>*/}

                    <p className="guess-singer-country-country-selected">País seleccionado: {hoveredCountry}</p>
                    {cantanteAdivinar && <p >Has hecho click en: {selectedCountry}</p>}

                    {/* Resultado de la dirección */}

                        {resultadoMensaje}


                    <button onClick={reiniciarJuego} >
                        Reiniciar Juego
                    </button>


                    <svg className="guess-singer-country-mapa"
                        width="800" height="446" viewBox="0 0 800 446"// Ajusta según el tamaño del mapa
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <MapPaths
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            handleCountryClick={handleCountryClick}
                        />
                    </svg>

        </div>
    );
};

export default InteractiveMap;