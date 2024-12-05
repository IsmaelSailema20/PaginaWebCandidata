import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Propuestas from "./pages/Propuestas.jsx";
import EventosNoticias from "./pages/EventosNoticias.jsx";
import TeamSection from "./pages/TeamSection.jsx";
import Navbar from "./components/NavBar.jsx";
import Home from "./pages/home.jsx";
import "./index.css";
import PaginaSugerenciasVotos from "./pages/PaginaSugerenciasVotos.jsx";
import PanelAdministracion from "./pages/PanelAdministracion.jsx";

function App() {
  return (
    <Router>
      {" "}
      {/* El Router envuelve la aplicación completa */}
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Verificar si estamos en la ruta de administración
  const isAdminPage = location.pathname === "/administracion";

  return (
    <div>
      {/* Condicional para no mostrar Navbar en /administracion */}
      {!isAdminPage && <Navbar />}

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<EventosNoticias />} />
          <Route path="/candidatos" element={<TeamSection />} />
          <Route path="/propuestas" element={<Propuestas />} />
          <Route path="/sugerencias" element={<PaginaSugerenciasVotos />} />
          <Route path="/administracion" element={<PanelAdministracion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
