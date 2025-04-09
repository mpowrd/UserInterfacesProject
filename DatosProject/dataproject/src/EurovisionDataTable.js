import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const EurovisionDataTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => { // Se ejecuta una vez cuando se monta el objeto
    // Ruta del archivo CSV en el directorio público
    fetch('canciones.csv') //Carga el csv
      .then(response => response.text()) // Transforma el csv a texto plano
      .then(csvData => {
        // Analiza el CSV y actualiza el estado con las columnas y los datos
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setColumns(Object.keys(result.data[0] || {}));
            setData(result.data);
          },
        });
      })
      .catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
      });
  }, []);

  return (
    <div>
      <h2>Datos del Festival de la Canción de Eurovisión</h2>
      {data.length > 0 ? ( // Condición: hay datos?
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    textAlign: 'left',
                    backgroundColor: '#f2f2f2',
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default EurovisionDataTable;
