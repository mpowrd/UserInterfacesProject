import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <div id="Titulo">
        <h1>Eurodle</h1>
        <button className="opciones">Opciones</button>
      </div>

      <div id="ModosJuego">
        <Link to="/GuessSongGame">
          <button>Adivina la Canción</button>
        </Link>

        <button disabled>Ordenas las canciones</button>

        <Link to="/AdivinaPais">
          <button>País del cantante</button>
        </Link>

        <button disabled>Más Vistas o Menos Vistas</button>
      </div>
    </div>
  );
}

export default App;
