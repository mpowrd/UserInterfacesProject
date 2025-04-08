import React, {useRef, useState} from "react";
import MapPaths from "../assets/MapPaths";

const InteractiveMap = () => {
    // Estados para almacenar el país seleccionado
    const [hoveredCountry, setHoveredCountry] = useState(null);

    const handleMouseEnter = (event) => {
        const country = event.target;
        setHoveredCountry(country.getAttribute("name"));
        country.setAttribute("stroke", "#ffcc00"); // Color del borde resaltado
        country.setAttribute("stroke-width", "2"); // Grosor del borde resaltado
    };

    const handleMouseLeave = (event) => {
        const country = event.target;
        setHoveredCountry(null);
        country.setAttribute("stroke", "black"); // Restaurar borde original
        country.setAttribute("stroke-width", "1");
    };

    const [resultadoMensaje, setResultadoMensaje] = useState("");

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

    function compararPaises(idDesde, paisAdivinar) {
        const desde = document.getElementById(idDesde);
        const hasta = document.getElementById(paisAdivinar);

        if (!desde) {
            console.warn("Países no encontrados");
            return;
        }

        const centroDesde = getCentroid(desde);
        const centroHasta = getCentroid(hasta);
        const {dir, arrow} = getDirectionWithArrow(centroDesde, centroHasta);

        const mensaje = `Pista: ${arrow}`;

        setResultadoMensaje(mensaje);
    }

    const paisAdivinar= {
        id:"DE",
        name:"Alemania",
    }

    const [selectedCountry,setSelectedCountry] = useState(null);

    const handleCountryClick = (event) => {
        const countrySelectedID = event.target.getAttribute("id");
        const countrySelectedName = document.getElementById(countrySelectedID).getAttribute("name");
        setSelectedCountry(countrySelectedID);

        paisAdivinado(countrySelectedID);
    };

    function paisAdivinado(countrySelectedID) {
        if (countrySelectedID === paisAdivinar.id) {
            setResultadoMensaje("¡Correcto! Has adivinado el país.");
        } else {
            compararPaises(countrySelectedID, paisAdivinar.id);
        }
    }

    return (
        <div>
            <h2>ADIVINA DONDE ESTA EL PAIS: {paisAdivinar.name}</h2>

            <p>País seleccionado: {hoveredCountry}</p>
            {paisAdivinar && <p>Has hecho click en: {selectedCountry}</p>}

            {/* Resultado de la dirección */}
            <div
                style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}
            >
                {resultadoMensaje}
            </div>

            {/* SVG como JSX */}
            <svg
                viewBox="-300 0 1500 1000" // Ajusta según el tamaño del mapa
                width="80%"

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