import {useEffect, useState} from "react";
import Header from './Header';
import GuessInput from './GuessInput';
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
    const [gameStatus, setGameStatus] = useState("playing")
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
    } );

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
                    setcurrentGuessCountry('');
                    setcurrentGuessYear('');
                }


            }
        }

    }

    return (<div></div>);
}

export default GuessSongGame;