import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import InteractiveMap from "./GuessSingerCountry/GuessSingerCountry";
import GuessSongGame from "./guessSong/GuessSongGame";
import Header from "./Header";
import { Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import OrderSongsGame from './OrderSongs/OrderSongsGame';
import Aboutus from './userInfo/Aboutus';
import Terms from './userInfo/Terms';
import Privacy from './userInfo/Privacy';
import Settings from "./Settings";
import GamemodeSelector from "./guessSong/GamemodeSelector";
import { SettingsProvider } from './SettingsProvider';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SettingsProvider>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AdivinaPais" element={<InteractiveMap />} />
        <Route path="/GuessSongGame" element={<GuessSongGame />} />
          <Route path="/GuessSongGame/GameModeSelector" element={<GamemodeSelector />} />
        <Route path="/OrderSongsGame" element={<OrderSongsGame />} />
        <Route path="/Settings" element={<Settings />} />

        {/* Puedes poner una ruta por defecto si quieres */}
        {/* <Route path="/" element={<HomeComponent />} /> */}
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/terms-of-use" element={<Terms />} />
        <Route path="/cookies&privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  </SettingsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
