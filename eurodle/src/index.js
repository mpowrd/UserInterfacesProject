import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import InteractiveMap from "./GuessSingerCountry/GuessSingerCountry";
import GuessSongGame from "./guessSong/GuessSongGame";
import { Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/AdivinaPais" element={<InteractiveMap />} />
    <Route path="/GuessSongGame" element={<GuessSongGame />} />
    {/* Puedes poner una ruta por defecto si quieres */}
    {/* <Route path="/" element={<HomeComponent />} /> */}
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
