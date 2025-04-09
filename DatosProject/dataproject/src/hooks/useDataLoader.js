import { useEffect, useState } from 'react';
import Papa from 'papaparse';

/*
Función que devuelve datos y nombre de columnas, observar ejemplo de ejecución en :
useDataLoaderExample.js
 */
const  useDataLoader = (filepath, type= 'json') => {
    const [data, setData] = useState([]); // guarda los datos del csv
    const [columns, setColumns] = useState([]); // guarda el nombre de las columnas
    const [loading, setLoading] = useState(true); // indica el estado de la carga
    const [error, setError] = useState(null); // guarda el error

    // USEEFFECT: Se ejecuta cada vez que se inicia el componente (constructor del componente)
    // En este caso llamará una función una función
    useEffect(()=> {

        // loadData: función que carga los datos del archivo (csv o json)
        const loadData= async () => {
            try{
                const res = await fetch(filepath); //traemos el archivo de la ruta
                const text = await res.text(); //convertimos el archivo en texto

                if(type === 'csv'){
                    Papa.parse(text, {
                        header: true,
                        skipEmptyLines: true,
                        complete: (result) => {
                            setColumns(Object.keys(result.data[0] || {})); //añadimos los nombres de la columna
                            setData(result.data); // añadimos los datos
                            setLoading(false) // indicamos el fin de la carga
                        },
                    });
                }else if (type === 'json'){
                    const jsonData = JSON.parse(text);
                    setColumns(Object.keys(jsonData[0] || {})); //añadimos los nombres de la columna
                    setData(jsonData); // añadimos los datos
                    setLoading(false); // indicamos el fin de la carga
                }
            }catch (err){
                // En caso de error lo añadimos para informar al usuario
                console.error("Error: Carga de datos fallida");
                setError(err); // añadimos el error
                setLoading(false);
            }
        }; // fin loadData

        loadData();


    }, [filepath, type]);

    return {data, columns,loading,error};
};

export default useDataLoader;