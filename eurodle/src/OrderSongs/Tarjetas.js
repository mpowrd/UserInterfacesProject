// Tarjetas.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import {useTranslation} from "react-i18next";
// Asumo que OrderSongsGame.css o un CSS global contiene los estilos.
// Si tienes un Tarjetas.css específico, impórtalo:
// import "./Tarjetas.css";

const DRAG_TYPES = {
    TARJETA_NUEVA: "TARJETA",
    TARJETA_EN_HUECO: "TARJETA_EN_HUECO"
};

// Componente Tarjeta individual (arrastrable)
const Tarjeta = ({ cancion, isGameFinished }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: DRAG_TYPES.TARJETA_NUEVA,
        item: { song_name: cancion.song_name },
        canDrag: !isGameFinished,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [cancion.song_name, isGameFinished]); // Agregada cancion.song_name a dependencias

    const tarjetaClasses = [
        "tarjeta", // Clase base de la tarjeta
        isDragging ? "is-dragging" : "", // Clase cuando se está arrastrando
        isGameFinished ? "game-finished" : "" // Clase si el juego ha terminado (para el cursor)
    ].filter(Boolean).join(" ");

    return (
        <div ref={drag} className={tarjetaClasses}>
            {cancion.song_name}
        </div>
    );
};

// Componente Tarjetas (contenedor y DropTarget)
const Tarjetas = ({ canciones, ordenUsuario, setOrdenUsuario, isGameFinished }) => {

    const { t } = useTranslation(['orderSongs']);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: DRAG_TYPES.TARJETA_EN_HUECO,
        drop: (item, monitor) => {
            if (isGameFinished) return;
            if (setOrdenUsuario && typeof item.originalIndex === 'number') {
                setOrdenUsuario(prevOrden => {
                    const newOrden = [...prevOrden];
                    if (newOrden[item.originalIndex] === item.song_name) {
                        newOrden[item.originalIndex] = null;
                    }
                    return newOrden;
                });
            }
        },
        canDrop: () => !isGameFinished,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [setOrdenUsuario, isGameFinished]);

    const availableTarjetas = canciones.filter(cancion => !ordenUsuario.includes(cancion.song_name));

    const containerClasses = [
        "tarjetas-container-droppable", // Clase base del contenedor
        isOver && canDrop ? "can-drop-over" : "", // Clase cuando se puede soltar encima
    ].filter(Boolean).join(" ");

    return (
        <div ref={drop} className={containerClasses}>
            <h2>{t('avaliableCards')}</h2>
            {availableTarjetas.length > 0 ? (
                <div className="tarjetas-list">
                    {availableTarjetas.map((cancion) => (
                        <Tarjeta
                            key={cancion.song_name}
                            cancion={cancion}
                            isGameFinished={isGameFinished}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-available-tarjetas-message"> {/* Clase para el mensaje */}
                    {t('allClear')}
                </p>
            )}
        </div>
    );
};

export default Tarjetas;