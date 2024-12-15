import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ScrollText,
  Search,
  Sparkles,
  Building2,
  Briefcase,
  GraduationCap,
  Users,
  Target,
  Lightbulb,
  Users2,
  DollarSign,
  Building,
  UserCog,
} from "lucide-react";

const Propuestas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCandidato, setSelectedCandidato] = useState("");
  const [selectedAlcance, setSelectedAlcance] = useState("");
  const [propuestas, setPropuestas] = useState([]);
  const [filteredPropuestas, setFilteredPropuestas] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allCandidatos, setAllCandidatos] = useState([]);
  const [allAlcances, setAllAlcances] = useState(["nacional", "regional", "local"]);
  const [currentCandidato, setCurrentCandidato] = useState({
    nombre_miembro: "",
    imgSrc: ""
  });

  const iconMap = {
    ScrollText: ScrollText,
    Building2: Building2,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    Users: Users,
    Target: Target,
    Lightbulb: Lightbulb,
    Users2: Users2,
    DollarSign: DollarSign,
    Building: Building,
    UserCog: UserCog,
  };

  useEffect(() => {
    const fetchPropuestas = async () => {
      try {
        const response = await fetch(
          "http://localhost/models/get_propuestas.php"
        );
        if (!response.ok)
          throw new Error(`Error en la solicitud: ${response.status}`);

        const data = await response.json();
        setPropuestas(data.propuestas);
        setFilteredPropuestas(data.propuestas.filter(p => p.visible));
        setAllCategories(
          Array.from(
            new Set(data.categorias.map((cat) => cat.nombre_cat_propuesta))
          )
        );
        setAllCandidatos(
          Array.from(
            new Set(data.propuestas.map((prop) => prop.nombre_miembro))
          )
        );
      } catch (error) {
        console.error("Error al obtener las propuestas:", error);
        setPropuestas([]);
        setFilteredPropuestas([]);
        setAllCategories([]);
        setAllCandidatos([]);
      }
    };
    fetchPropuestas();
  }, []);

  useEffect(() => {
    let filtered = propuestas.filter(propuesta => propuesta.visible);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((propuesta) =>
        selectedCategories.includes(propuesta.categoria)
      );
    }

    if (selectedCandidato) {
      filtered = filtered.filter((propuesta) =>
        propuesta.nombre_miembro === selectedCandidato
      );
    }

    if (selectedAlcance) {
      filtered = filtered.filter((propuesta) =>
        propuesta.alcance_propuesta === selectedAlcance
      );
    }
    const uniquePropuestas = Array.from(new Set(filtered.map(p => p.id_propuesta)))
      .map(id => filtered.find(p => p.id_propuesta === id));

    setFilteredPropuestas(uniquePropuestas);
    setCurrentIndex(0);
  }, [selectedCategories, selectedCandidato, selectedAlcance, propuestas]);

  useEffect(() => {
    if (filteredPropuestas.length > 0) {
      const propuesta = filteredPropuestas[currentIndex];
      setCurrentCandidato({
        nombre_miembro: propuesta.nombre_miembro,
        imgSrc: propuesta.imgSrc
      });
    }
  }, [currentIndex, filteredPropuestas]);

  const handleCategoryClick = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  const handleCandidatoClick = (candidato) =>
    setSelectedCandidato(prev => prev === candidato ? "" : candidato);

  const handleAlcanceClick = (alcance) =>
    setSelectedAlcance(prev => prev === alcance ? "" : alcance);

  const handleNavigation = (direction) => {
    if (isAnimating || filteredPropuestas.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      direction === "next"
        ? prev === filteredPropuestas.length - 1
          ? 0
          : prev + 1
        : prev === 0
        ? filteredPropuestas.length - 1
        : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
      console.warn(`Icon not found: ${iconName}`);
      return null;
    }
    return <IconComponent className="w-8 h-8 text-white" />;
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.5;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }

          .bubble {
            position: absolute;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
            backdrop-filter: blur(2px);
            border-radius: 50%;
            pointer-events: none;
            will-change: transform;
          }
        `}
      </style>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 3 + 6;

          return (
            <div
              key={i}
              className="bubble"
              style={{
                width: `${size}rem`,
                height: `${size}rem`,
                left: `${left}%`,
                bottom: "-20px",
                animation: `float ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-5/12 p-8 flex flex-col justify-center items-center">
          <div className="relative mb-8">
            <img
              src={currentCandidato.imgSrc}
              alt={currentCandidato.nombre_miembro}
              className="w-60 h-50 relative rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
            {showSparkle && (
              <Sparkles
                className="absolute -top-4 -right-4 w-8 h-8 text-yellow-300 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-montserrat">
            {currentCandidato.nombre_miembro}
          </h2>
          <div className="mt-8 w-full">
            <div className="bg-gray-100 backdrop-blur-lg rounded-2xl p-4 shadow-xl">
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-gray-700">Filtrar por Categoría</h5>
                <br/>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategories.includes(category)
                          ? "bg-[#42B9E5] text-white"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-gray-700">Filtrar por Alcance</h5>
                <br/>
                <div className="flex flex-wrap gap-2">
                  {allAlcances.map((alcance) => (
                    <button
                      key={alcance}
                      onClick={() => handleAlcanceClick(alcance)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedAlcance === alcance
                          ? "bg-[#42B9E5] text-white"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {alcance}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-gray-700">Filtrar por Candidato</h5>
                <br/>
                <div className="flex flex-wrap gap-2">
                  {allCandidatos.map((candidato) => (
                    <button
                      key={candidato}
                      onClick={() => handleCandidatoClick(candidato)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCandidato === candidato
                          ? "bg-[#42B9E5] text-white"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {candidato}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <div className="text-center mb-20">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-[#42B9E5] to-[#FF5B8E] text-transparent bg-clip-text animate-gradient font-montserrat">
                Nuestras Propuestas
              </h3>
            </div>

            <div className="w-full max-w-xl">
              <div className="relative h-96">
                {filteredPropuestas.length > 0 ? (
                  filteredPropuestas.map((propuesta, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <div
                        key={propuesta.id_propuesta}
                        className={`absolute inset-0 w-full transition-all duration-500 ease-out ${
                          isActive
                            ? "opacity-100 translate-x-0 scale-100"
                            : index < currentIndex
                            ? "opacity-0 -translate-x-full scale-95"
                            : "opacity-0 translate-x-full scale-95"
                        }`}
                      >
                        <div className="bg-gray-100 rounded-xl shadow-lg p-8 h-full flex flex-col border border-gray-200">
                          <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-gradient-to-r from-[#42B9E5] to-[#FF5B8E]">
                              {renderIcon(propuesta.icon)}
                            </div>
                          </div>
                          <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF] font-montserrat">
                              {propuesta.titulo_propuesta}
                            </h3>
                            <h4 className="text-lg font-semibold text-[#72D5FF] font-montserrat">
                              {propuesta.subtitle}
                            </h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-center flex-grow font-montserrat">
                            {propuesta.descripcion_propuesta}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500">
                    No hay propuestas que coincidan con los criterios de búsqueda.
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {filteredPropuestas.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#FF8B9A] w-4"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-20 mt-8">
                <button
                  onClick={() => handleNavigation("prev")}
                  className="bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                  disabled={isAnimating || filteredPropuestas.length === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                  disabled={isAnimating || filteredPropuestas.length === 0}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Propuestas;

