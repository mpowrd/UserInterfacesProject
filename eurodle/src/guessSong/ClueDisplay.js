// ClueDisplay.js
import React from "react";
import ClueItem from "./ClueItem";

const ClueDisplay = ({ pistas }) => {
    return (
        <div className="clue-display">
            <h2>Pistas</h2>

            {pistas.length === 0 ? (
                <p>Sin pistas todavía.</p>
            ) : (
                pistas.map((pista, index) => (
                    <ClueItem key={index} intento={pista.intento} pistas={pista.pistas} />
                ))
            )}
        </div>
    );
};

export default ClueDisplay;
