import React, { useState } from "react";

const GuessForm = ({ canciones, onGuess, fallos }) => {
    const [entrada, setEntrada] = useState("");
    const [sugerencias, setSugerencias] = useState([]);

    const handleChange = (e) => {
        const valor = e.target.value;
        setEntrada(valor);

        if (valor.length === 0) {
            setSugerencias([]);
            return;
        }

        // Listado de nombres de canciones falladas
        const falladas = fallos.map(f => f.song_name.toLowerCase());

        //No mostramos en el filtro la canción si ya fue fallada
        const filtro = canciones
            .filter((cancion) =>
                cancion.song_name.toLowerCase().includes(valor.toLowerCase()) &&
                !falladas.includes(cancion.song_name.toLowerCase())
            )
            .slice(0, 10); // Mostramos 10 canciones de autocompletado

        setSugerencias(filtro);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (entrada.trim() !== "") {
            onGuess(entrada.trim());
            setEntrada("");
            setSugerencias([]);
        }
    };

    const handleClickSugerencia = (titulo) => {
        setEntrada(titulo);
        setSugerencias([]);
    };

    return (
        <div className="guess-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adivina la canción..."
                    value={entrada}
                    onChange={handleChange}
                />
                <button type="submit">Adivinar</button>
            </form>

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
        </div>
    );
};

export default GuessForm;
