import React, { useEffect } from 'react';

function GuessForm({ value_country, value_year, value_song, value_method, onChange_country, onChange_year, onChange_song, onChange_method, onSubmit }) {

    // value_country={currentGuessCountry}
    // value_year={currentGuessYear}
    // value_song={currentGuessSong}

    // onChange_country={handleGuessChangeCountry}
    // onChange_year={handleGuessChangeYear}
    // onChange_song={handleGuessChangeSong}

    // onSubmit={handleGuessSubmit}

    const cambiarAanyoYpais = () => {
        onChange_method(1);
    };
    
    const cambiarAcancion = () => {
        onChange_method(0);
    };

    useEffect(() => {
        if (value_method === undefined || value_method === null) {
          onChange_method(0); // Por defecto: adivinar por canción
        }
    }, [value_method, onChange_method]);

  return (

    // Usar form es semánticamente correcto y permite enviar con Enter

    <form onSubmit={onSubmit} className="guess-form">

        <label> cancion: </label>

    <input

        type="text"

        value={value_song}

        onChange={onChange_song}

        placeholder="Adivina la canción" // Actualiza placeholder si es necesario

        aria-label="Introduce tu respuesta"

        className="guess-input"
        
        disabled={value_method === 1}

      />

      <br></br>

        <label> país: </label>

    <input

        type="text"

        value={value_country}

        onChange={onChange_country}

        placeholder="Introduce el pais" // Actualiza placeholder si es necesario

        aria-label="Introduce tu respuesta"

        className="guess-input"
        
        disabled={value_method === 0}

    />

        <label> año: </label>

    <input

        type="text"

        value={value_year}

        onChange={onChange_year}

        placeholder="Introduce el año" // Actualiza placeholder si es necesario

        aria-label="Introduce tu respuesta"

        className="guess-input"
        
        disabled={value_method === 0}

    />

    <br></br>

    <label>
        <input
          type="radio"
          name="guessType"
          onChange={cambiarAcancion}
          checked={value_method === 0}
        />
        Por nombre de la canción
      </label>

      <label>
        <input
          type="radio"
          name="guessType"
          onChange={cambiarAanyoYpais}
          checked={value_method === 1}
        />
        Por año y país
      </label>
      
      <button type="submit" className="guess-button">

        Adivinar

      </button>

    </form>

  );

}

export default GuessForm;
