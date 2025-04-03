import { useState } from "react";
import europeMap from "./assets/europe.svg"; // Asegúrate de tener un mapa SVG de Europa

const countries = {
    FR: "Francia",
    DE: "Alemania",
    IT: "Italia",
    ES: "España",
    // Agrega más países según el SVG
};

export default function EuropeMap() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (countryCode) => {
        setSelectedCountry(countryCode);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Selecciona un país</h2>
            <div className="relative">
                <img src={europeMap} alt="Mapa de Europa" className="w-full" />
                <svg
                    viewBox="0 0 800 600"
                    className="absolute top-0 left-0 w-full h-full"
                >
                    {Object.keys(countries).map((code) => (
                        <path
                            key={code}
                            d={getCountryPath(code)} // Función para obtener la ruta del país
                            fill="transparent"
                            stroke="black"
                            strokeWidth={selectedCountry === code ? 3 : 1}
                            className="cursor-pointer hover:fill-blue-300"
                            onClick={() => handleCountryClick(code)}
                        />
                    ))}
                </svg>
            </div>
            {selectedCountry && (
                <p className="mt-4 text-lg">
                    País seleccionado: {countries[selectedCountry]}
                </p>
            )}
        </div>
    );
}

function getCountryPath(countryCode) {
    const paths = {
        FR: "M200,100 L250,150 L200,200 Z", // Ejemplo de coordenadas (debes reemplazarlo con las reales)
        DE: "M300,100 L350,150 L300,200 Z",
        IT: "M400,100 L450,150 L400,200 Z",
        ES: "M500,100 L550,150 L500,200 Z",
    };
    return paths[countryCode] || "";
}
