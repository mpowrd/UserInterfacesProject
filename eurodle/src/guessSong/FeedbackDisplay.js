import React from 'react';

function FeedbackDisplay({ guesses, message, maxGuesses }) {

  return (

    <div className="feedback-section">

      <div className="failures-counter">

         Fallos: {guesses} / {maxGuesses}

         {/* Podrías mostrar iconos o barras de progreso aquí */}

      </div>

      {message && <p className="feedback-message">{message}</p>}

    </div>

  );

}

export default FeedbackDisplay;
