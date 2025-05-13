// Huecos.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import {useTranslation} from "react-i18next";

const DRAG_TYPES = {
    TARJETA_NUEVA: "TARJETA",
    TARJETA_EN_HUECO: "TARJETA_EN_HUECO"
};

// Componente Huecos (plural)
const Huecos = ({ ordenUsuario, setOrdenUsuario, feedback, isGameFinished }) => {
    return (
        <div className="huecos"> {/* Esta clase ya está en tu CSS */}
            {ordenUsuario.map((songNameInSlot, index) => (
                <Hueco
                    key={index}
                    index={index}
                    currentSongName={songNameInSlot}
                    setOrdenUsuario={setOrdenUsuario}
                    feedbackIcon={feedback ? feedback[index] : null}
                    isGameFinished={isGameFinished}
                    // ordenUsuarioLength no parece usarse en Hueco, se puede quitar si es así
                />
            ))}
        </div>
    );
};

// Componente Hueco (individual)
const Hueco = ({ index, currentSongName, setOrdenUsuario, feedbackIcon, isGameFinished }) => {

    const { t } = useTranslation(['orderSongs']);

    const [{ isDragging: isDraggingThisHuecoContent }, drag] = useDrag(() => ({
        type: DRAG_TYPES.TARJETA_EN_HUECO,
        item: { song_name: currentSongName, originalIndex: index },
        canDrag: !!currentSongName && !isGameFinished,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [currentSongName, index, isGameFinished]);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: [DRAG_TYPES.TARJETA_NUEVA, DRAG_TYPES.TARJETA_EN_HUECO],
        drop: (item, monitor) => {
            if (isGameFinished) return;

            setOrdenUsuario(prev => {
                const newOrden = [...prev];

                // Si el item viene de un hueco, borra su posición original
                if (typeof item.originalIndex === "number") {
                    newOrden[item.originalIndex] = null;
                }

                // Si el hueco de destino ya tiene algo, buscar su posición y moverlo a la original si aplica
                const targetSong = newOrden[index];
                if (targetSong && typeof item.originalIndex === "number") {
                    newOrden[item.originalIndex] = targetSong; // Intercambio
                }

                // Insertar la nueva canción en el hueco destino
                newOrden[index] = item.song_name;

                return newOrden;
            });
        },
    }), [index, isGameFinished, setOrdenUsuario]);

    // Aplicar clases dinámicas en lugar de estilos en línea siempre que sea posible
    const huecoClasses = [
        "hueco", // Clase base
        isDraggingThisHuecoContent ? "is-dragging-source" : "",
        isOver && canDrop ? "is-over-can-drop" : "",
        feedbackIcon === "✔️" ? "feedback-correct" : "",
        feedbackIcon === "❌" ? "feedback-incorrect" : "",
        !currentSongName && !feedbackIcon ? "hueco-vacio-placeholder" : "", // Para el texto (Vacío)
        currentSongName ? "hueco-con-cancion" : "" // Para cuando tiene una canción
    ].filter(Boolean).join(" "); // Filtra vacíos y une

    // Los estilos que realmente necesitan ser dinámicos y no se manejan bien solo con clases
    const dynamicHuecoStyle = {
        // La opacidad y el cursor se pueden manejar mayormente con clases,
        // pero los dejamos aquí si prefieres este control directo.
        opacity: isDraggingThisHuecoContent ? 0.4 : 1, // Podría ser :hover:active de la clase is-dragging-source
        cursor: (!!currentSongName && !isGameFinished) ? 'grab' : 'default',
    };

    // Permite regresar una tarjeta a la zona incial al hacer doble clic
    const handleDoubleClick = () => {
        if (!isGameFinished && currentSongName) {
            setOrdenUsuario((prevOrden) => {
                const newOrden = [...prevOrden];
                newOrden[index] = null;
                return newOrden;
            });
        }
    };

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={huecoClasses}
            style={dynamicHuecoStyle}
        >
            {currentSongName ? (
                // La canción dentro del hueco ahora usa la clase .cancion-en-hueco
                // que definiremos en CSS para que se parezca a .tarjeta
                <div className="cancion-en-hueco" onDoubleClick={handleDoubleClick}>
                    <span>{currentSongName}</span>
                    {feedbackIcon && (
                        <span
                            className="feedback-icono" // Clase para el ícono
                            style={{ color: feedbackIcon === "✔️" ? "green" : "red" }} // El color del ícono sí es dinámico
                        >
            {feedbackIcon}
          </span>
                    )}
                </div>
            ) : (
                // El texto "(Vacío)" se estilizará con .hueco-vacio-placeholder o .texto-hueco-vacio
                <span className="texto-hueco-vacio">({t("emptyCard")})</span>
            )}
        </div>
    );

};

export default Huecos;