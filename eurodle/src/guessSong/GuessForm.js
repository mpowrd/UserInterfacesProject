import React, { useState } from "react";

const GuessForm = ({ canciones, onGuess, fallos }) => {
    const [entrada, setEntrada] = useState("");
    const [entradaAnyo, setEntradaAnyo] = useState("");
    const [entradaPais, setEntradaPais] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [sugerenciasPais, setSugerenciasPais] = useState([]);
    const [guessType, setGuessType] = useState(0);

    const [falladas, setFalladas] = useState(fallos.map(f => f.song_name.toLowerCase()));
    const [falladasPaisAnyo, setFalladasPaisAnyo] = useState(fallos.map(f => f.country + "$songGuess$" + f.year));

    const handleChange = (e) => {
        const valor = e.target.value;
        setEntrada(valor);

        if (valor.length === 0) {
            setSugerencias([]);
            return;
        }

        // Listado de nombres de canciones falladas
        const falladasNew = fallos.map(f => f.song_name.toLowerCase());
        setFalladas(falladasNew);

        const falladasPANew = fallos.map(f => f.country + "$songGuess$" + f.year);
        setFalladasPaisAnyo(falladasPANew);

        //No mostramos en el filtro la canción si ya fue fallada
        const filtro = canciones
            .filter((cancion) =>
                cancion.song_name.toLowerCase().includes(valor.toLowerCase()) &&
                !falladasNew.includes(cancion.song_name.toLowerCase())
            )
            .slice(0, 10); // Mostramos 10 canciones de autocompletado

        setSugerencias(filtro);
    };

    const handleChangePais = (e) => {
        const valor = e.target.value;
        setEntradaPais(valor);

        if (valor.length === 0) {
            setSugerenciasPais([]);
            return;
        }

        const falladasPANew = fallos.map(f => f.country + "$songGuess$" + f.year);
        setFalladasPaisAnyo(falladasPANew);

        const filtro = canciones
            .filter((cancion) =>
                cancion.country.toLowerCase().includes(valor.toLowerCase())
            );

        // Creamos un objeto para mantener los países únicos, usando el país como clave.
        const paisesUnicos = filtro.reduce((acc, cancion) => {
            // Usamos el nombre del país como clave para evitar duplicados.
            if (!acc[cancion.country]) {
                acc[cancion.country] = cancion;
            }
            return acc;
        }, {});

        // Convertimos el objeto de países únicos de vuelta a un array.
        const paisesUnicosArray = Object.values(paisesUnicos).slice(0, 10);

        setSugerenciasPais(paisesUnicosArray);
    };

    const handleChangeAnyo = (e) => {
        const valor = e.target.value;
        if (valor.length <= 4 && valor>=0) {
            setEntradaAnyo(valor); // Actualiza el estado solo si no excede los 4 dígitos
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(guessType === 0){
            if (entrada.trim() !== "") {
                if(!falladas.includes(entrada.toLowerCase())){
                    onGuess(entrada.trim(), guessType);
                } else{
                    alert("Ya has intentado con esa, ¡prueba otra diferente!");
                }
                setEntrada("");
                setEntradaAnyo("");
                setEntradaPais("");
                setSugerencias([]);
                setSugerenciasPais([]);
            }
        } else{
            if (entradaPais.trim() !== "" && entradaAnyo.trim() !== "") {
                const currYearCountryGuess = entradaPais + "$songGuess$" + entradaAnyo.trim();
                if(!falladasPaisAnyo.includes(currYearCountryGuess)){
                    onGuess(entradaPais + "$songGuess$" + entradaAnyo.trim(), guessType);
                } else{
                    alert("Ya has intentado con esa combinación de país y año, ¡prueba otra diferente!");
                }
                setEntrada("");
                setEntradaAnyo("");
                setEntradaPais("");
                setSugerencias([]);
                setSugerenciasPais([]);
            }
        }


    };

    const handleClickSugerencia = (titulo) => {
        setEntrada(titulo);
        setSugerencias([]);
    };

    const handleClickSugerenciaPais = (titulo) => {
        setEntradaPais(titulo);
        setSugerenciasPais([]);
    };

    return (
        <div className="guess-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adivina la canción..."
                    value={entrada}
                    onChange={handleChange}
                    hidden={guessType}
                />
                {/* Sugerencias dinámicas */}
                {sugerencias.length > 0 && (
                    <ul className="sugerencias">
                        {sugerencias.map((s, index) => (
                            <li key={index} onClick={() => handleClickSugerencia(s.song_name)}>
                                {s.song_name}
                            </li>
                        ))}
                    </ul>
                )}


                <div className="input-group">
                    <input className="inputYC"
                           type="number"
                           placeholder="Introduce el año..."
                           value={entradaAnyo}
                           onChange={handleChangeAnyo}
                           hidden={!guessType}
                    />
                    <input className="inputYC"
                           type="text"
                           placeholder="Introduce el país..."
                           value={entradaPais}
                           onChange={handleChangePais}
                           hidden={!guessType}
                    />
                </div>

                {sugerenciasPais.length > 0 && (
                    <ul className="sugerencias">
                        {sugerenciasPais.map((s, index) => (
                            <li key={index} onClick={() => handleClickSugerenciaPais(s.country)}>
                                {s.country}
                            </li>
                        ))}
                    </ul>
                )}

                <button type="submit">Adivinar</button>

                <div className="guess-method-selector">
                    <label className="radio-option">
                        <input type="radio" name="guessMethod" value="0" onClick={() => setGuessType(0)}
                               checked={guessType === 0}/>
                        <span></span>
                        Adivinar por título
                    </label>

                    <label className="radio-option">
                        <input type="radio" name="guessMethod" value="1" onClick={() => setGuessType(1)}
                               checked={guessType === 1}/>
                        <span></span>
                        Adivinar por Año y País
                    </label>
                </div>

            </form>
        </div>
    );
};

export default GuessForm;
