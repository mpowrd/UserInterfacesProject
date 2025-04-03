import './App.css';
import InteractiveMap    from "./GuessSingerCountry/GuessSingerCountry";
import { Routes, Route, Link } from 'react-router-dom';

function App() {

    return (
        <div>

            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/AdivinaPais" element={<InteractiveMap/>}></Route>

            </Routes>

            <div id="Titulo">
                <h1>Eurodle</h1>
                <button className="opciones">Opciones</button>
            </div>
            <div id="ModosJuego">

                <a href="">
                    <button>Adivina la Canción</button>
                </a>

                <a href="">
                    <button>Ordenas las canciones</button>
                  </a>

                <a href="">
                    <button>Pais del cantante</button>
                </a>

                <a href="">
                    <button>Pais del cantante</button>
                </a>

                <a href="">
                    <button>Más Vistas o Menos Vistas</button>
                </a>


            </div>
        </div>
      );
}

export default App;


