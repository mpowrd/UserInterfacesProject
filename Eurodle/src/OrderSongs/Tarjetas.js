import React from "react";

const Tarjetas = ({ canciones, ordenUsuario, handleDragStart }) => {
    return (
        <div className="tarjetas">
            {canciones.map((cancion, index) => (
                !ordenUsuario.includes(cancion.song_name) && (
                    <div
                        key={index}
                        className="tarjeta"
                        draggable
                        onDragStart={(e) => handleDragStart(e, cancion.song_name)}
                    >
                        {cancion.song_name}
                    </div>
                )
            ))}
        </div>
    );
};

export default Tarjetas;
