import React from "react";

const Huecos = ({ ordenUsuario, feedback, handleDrop, handleDragOver, handleDragStart }) => {
    return (
        <div className="huecos">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="hueco"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                >
                    <span className="puesto">Puesto {index + 1}</span>
                    {ordenUsuario[index] ? (
                        <div
                            className="hueco-contenido"
                            draggable
                            onDragStart={(e) => handleDragStart(e, ordenUsuario[index], index)}
                        >
                            {ordenUsuario[index]}
                            {feedback[index] && <span>{feedback[index]}</span>}
                        </div>
                    ) : (
                        <span>Arrastra aquí</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Huecos;
