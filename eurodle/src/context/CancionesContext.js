import React ,{createContext,useState} from "react";


export const CancionesContext = createContext();


export const CancionesProvider = ({children}) => {
    const [cancionesOriginales, setcancionesOriginales] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [filtradas, setFiltradas] = useState([]);

    const cargarCanciones = (data, columns) => {
        setcancionesOriginales(data);
        setColumnas(columns);
    };

    return (
        <CancionesContext.Provider
            value={{
                cancionesOriginales,
                columnas,
                filtradas,
                cargarCanciones,
            }}
        >
            {children}
        </CancionesContext.Provider>
    );
}