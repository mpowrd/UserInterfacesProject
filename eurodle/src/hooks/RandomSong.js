import React,{useEffect, useState} from "react";
import UseDataLoader from "./useDataLoader";

/*
Esta función toma un conjunto de columnas deseadas y devuelve una
canción aleatoria del dataset
 */

const RandomSong = ({columnas}) => {
    const { data, loading } = UseDataLoader('canciones.csv', 'csv');
    const [fila,setFila] = useState("🎲 Mostrar aleatoria")

    const mostrarFilaAleatoria = () => {
        const fila_random = getRandomRowWithColumns(data, columnas);
        setFila(fila_random['song_name']);
        return fila_random; // Ahora la función devuelve un JSON con la fila aleatoria
    };

    return (
        <div>
            <h2>Obtener Canción Aleatoria</h2>
            {loading ? (
                <p>Cargando canciones...</p>
            ) : (
                <button onClick={() => console.log(mostrarFilaAleatoria())}>{fila}</button>
            )}
        </div>
    );
}

// const RandomSong = ({columnas}) => {
//     const { data } = UseDataLoader('canciones.csv', 'csv');
//     const [fila,setFila] = useState("")
//
//     useEffect(() => {
//         if (data && data.length > 0) {
//             const mostrarFilaAleatoria = () => {
//                 const fila_random = getRandomRowWithColumns(data, columnas);
//                 setFila(fila_random ? fila_random['song_name'] : 'No se encontró la canción');
//             };
//
//
//             mostrarFilaAleatoria();
//         }
//     }, [data,columnas]);
//
//
//
//     return (fila);
// }


const getRandomRowWithColumns = (data,columnasDeseadas) => {
    if (!data || data.length === 0) return null; // comprueba si hay datos

    const index = Math.floor(Math.random() * data.length); // Toma un índice aleatorio para las filas
    const fila = data[index];

    const resultado = {};

    // Iteramos en el array de columnasDeseadas
    columnasDeseadas.forEach((col) => {
        resultado[col] = fila[col];
    });


    return resultado;
}

export default RandomSong;