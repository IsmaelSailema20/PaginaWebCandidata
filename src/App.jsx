import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Propuestas from "./pages/Propuestas.jsx";
import EventosNoticias from "./pages/EventosNoticias.jsx";
import TeamSection from "./pages/TeamSection.jsx";
import Navbar from "./components/NavBar.jsx";
import Home from "./pages/home.jsx";
import "./index.css";
import PaginaSugerenciasVotos from "./pages/PaginaSugerenciasVotos.jsx";

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
