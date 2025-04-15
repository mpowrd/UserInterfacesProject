import React from "react";

const Mensaje = ({ mensaje }) => {
    return mensaje ? <div className="mensaje">{mensaje}</div> : null;
};

export default Mensaje;
