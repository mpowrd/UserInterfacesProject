import './App.css';
import { Link } from 'react-router-dom';
import "./css/estiloEuro.css";
import { FiSettings } from 'react-icons/fi'; // Necesita instalar: npm install react-icons


function App() {
  return (
      <div className="eurodle-wrapper">
          <div className="eurodle-container">
              <div className="settings-icon">
                  <button className="settings-btn" aria-label="Opciones">
                      <FiSettings size={24} />
                  </button>
              </div>

              <header className="eurodle-header">
                  <h1 className="eurodle-title">Eurodle</h1>
                  <p className="eurodle-subtitle">Inspirado en Eurovisión 2025</p>
              </header>

              <main className="eurodle-menu">
                  <Link to="/GuessSongGame">
                      <button className="eurodle-btn">Adivina la Canción</button>
                  </Link>
                  <Link to="/OrderSongsGame">
                      <button className="eurodle-btn">Ordena las Canciones</button>
                  </Link>
                  <Link to="/AdivinaPais">
                      <button className="eurodle-btn">País del Cantante</button>
                  </Link>
                  <button className="eurodle-btn disabled" disabled>Más Vistas o Menos Vistas</button>
              </main>

              <footer className="eurodle-footer">
                  <p>© 2025 Eurodle. Unidos por la música.</p>
              </footer>
          </div>
      </div>
    
  );
}

export default App;
