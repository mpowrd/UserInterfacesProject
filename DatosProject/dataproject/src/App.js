import React, {useState} from 'react';
import './App.css';

import UseDataLoaderExample from "./useDataLoaderExample";
import RandomSong from "./hooks/RandomSong";

function App() {
    const col =['year', 'song_name'];
    const [cancion, setCancion] = useState("🎲 Mostrar aleatoria");

    return (
        <div>
            <h1>Aplicación de Canciones</h1>

            <RandomSong columnas={col}/>
            <UseDataLoaderExample /> {/* Aquí se incluye el componente que carga y muestra los datos */}
        </div>
    );
}


export default App;
