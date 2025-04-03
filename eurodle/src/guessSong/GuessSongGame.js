import {useEffect, useState} from "react";
import Header from './Header';
import GuessForm from './GuessForm';
import FeedbackDisplay from './FeedbackDisplay';
import ClueDisplay from './ClueDisplay';

const GuessSongGame = () => {

    const [songToGuess, setSongToGuess] = useState("");

    const [currentGuessSong, setcurrentGuessSong] = useState("");
    const [currentGuessYear, setCurrentGuessYear] = useState("");
    const [currentGuessCountry, setCurrentGuessCountry] = useState("");
    const [selectedGuessMethod, setSelectedGuessMethod] = useState(0); // 0 - SONG / 1 - YEAR & COUNTRY

    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [revealedClues, setRevealedClues] = useState([]);
    const [gameStatus, setGameStatus] = useState("playing");
    const [feedbackMessage, setFeedbackMessage] = useState('');

    function searchRandomSong(){
        let song = "";
        // TO-DO
        return song;
    }

    useEffect( () => {
        let song;
        song = searchRandomSong();
        setSongToGuess(song);
    }, [] );

    const handleGuessSubmit = (event) => {
        event.preventDefault();
        if((gameStatus === "playing")
        || (selectedGuessMethod === 0 && currentGuessSong !== "")
        || (selectedGuessMethod === 1 && currentGuessYear !== "" && currentGuessCountry !== "")){

            let isCorrect = false;

            if(selectedGuessMethod === 0){
                isCorrect = currentGuessSong === songToGuess.name;
            } else{
                isCorrect = currentGuessYear === songToGuess.year && currentGuessCountry === songToGuess.country;
            }

            if(isCorrect){
                setGameStatus("won");
                setFeedbackMessage(`¡Correcto! La canción era ${songToGuess.nombre}`);
            } else{
                const newIncorrectGuesses = incorrectGuesses + 1;
                setIncorrectGuesses(newIncorrectGuesses);

                if(selectedGuessMethod === 0){
                    setcurrentGuessSong(''); // Limpiar input;
                } else{
                    setCurrentGuessCountry('');
                    setCurrentGuessYear('');
                }

                if(newIncorrectGuesses >= 7){
                    setFeedbackMessage(`Has perdido, no te quedan más intentos :( . La canción era ${songToGuess.nombre}`);
                    setGameStatus("lost");    

                } else{
                    const nextClue = newIncorrectGuesses; // La pista N se revela en el fallo N

                    setRevealedClues(prevClues => [...prevClues, nextClue]);

                    setFeedbackMessage(`Has fallado, sigue intentándolo. Te quedan ${7 - newIncorrectGuesses} intentos`);

                }
            }
        }

    };

    const handleGuessChangeYear = (event) => {

        setCurrentGuessYear(event.target.value);
    
    };

    const handleGuessChangeCountry = (event) => {

        setCurrentGuessCountry(event.target.value);
    
    };

    const handleGuessChangeSong = (event) => {

        setcurrentGuessSong(event.target.value);
    
    };
        
    return(
    <div className="game-container">

      <Header /> {/* Puedes pasarle props si necesita interactividad */}

      <FeedbackDisplay

         guesses={incorrectGuesses}

         message={feedbackMessage}

         maxGuesses={7}

      />

      <ClueDisplay

         songData={songToGuess}

         revealedClues={revealedClues}

         gameStatus={gameStatus}

      />

       {/* Mostrar input solo si se está jugando */}

      {gameStatus === 'playing' && (

         <GuessForm

           value_country={currentGuessCountry}
           value_year={currentGuessYear}
           value_song={currentGuessSong}
           value_method={selectedGuessMethod}

           onChange_country={handleGuessChangeCountry}
           onChange_year={handleGuessChangeYear}
           onChange_song={handleGuessChangeSong}
           onChange_method={setSelectedGuessMethod}

           onSubmit={handleGuessSubmit}

         />

       )}

       {/* O mostrar un botón para jugar de nuevo si won/lost */}

       {(gameStatus === 'won' || gameStatus === 'lost') && (

            // Aquí iría un botón para reiniciar el juego (que llamaría a la lógica de inicialización de nuevo)

            <button onClick={() => window.location.reload()}>Jugar de nuevo</button> // Recarga simple por ahora

       )}

    </div>

    );
}

export default GuessSongGame;