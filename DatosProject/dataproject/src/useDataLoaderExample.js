import React from 'react';
import useDataLoader from './hooks/useDataLoader';

const UseDataLoaderExample = () => {
    const { data, columns, loading } = useDataLoader('/canciones.csv', 'csv');

    if (loading) return <p>Cargando canciones...</p>;

    return (
        <table>
            <thead>
            <tr>{columns.map((col, i) => <th key={i}>{col}</th>)}</tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    {columns.map((col, j) => <td key={j}>{row[col]}</td>)}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UseDataLoaderExample;
