import React from 'react';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados.js';
import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar bg-dark border-bottom border-body navbar-dark">
          <div className="container-fluid">
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item me-3">
                <Link className="nav-link text-white" to="/">Catálogo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dados">Novo</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Contêiner para centralizar o conteúdo */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<LivroLista />} />
            <Route path="/dados" element={<LivroDados />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
