import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Propuestas from "./Propuestas";
import EventosNoticias from "./EventosNoticias.jsx";
import TeamSection from "./TeamSection.jsx";
import Navbar from "./NavBar.jsx";
import Home from "./home.jsx";
import "./index.css";
import PaginaSugerenciasVotos from "./PaginaSugerenciasVotos.jsx";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<EventosNoticias />} />
            <Route path="/candidatos" element={<TeamSection />} />
            <Route path="/propuestas" element={<Propuestas />} />
            <Route path="/sugerencias" element={<PaginaSugerenciasVotos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
