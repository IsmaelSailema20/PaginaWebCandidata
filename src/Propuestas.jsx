import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Radio, ScrollText, Sparkles, Search, Building2, Briefcase, GraduationCap, Users, Target, Lightbulb, Users2, DollarSign, Building, UserCog } from 'lucide-react';
import maryImage from './Mary.jpg';

const Propuestas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPropuestas, setFilteredPropuestas] = useState([]);

  const propuestas = [
      {
        title: "Planificación estratégica",
        subtitle: "ODS PEDI",
        description: "Mary Cruz propone actualizar el Plan Estratégico de Desarrollo Institucional (PEDI) para alinearlo con las demandas actuales y los Objetivos de Desarrollo Sostenible (ODS). Su enfoque es claro: metas concretas que abarcan los ámbitos académico, de investigación e innovación, y vinculación con la sociedad.",
        icon: <ScrollText className="w-8 h-8" />,
        tags: ["planificación", "desarrollo", "innovación"]
      },
      {
        title: "Fortalecimiento de la Gobernabilidad Universitaria",
        subtitle: "Armonía Unión y paz Transparencia",
        description: "Bajo el liderazgo de Mary Cruz, la universidad promoverá una participación inclusiva, donde docentes, estudiantes y personal administrativo serán parte activa en la toma de decisiones, fomentando un ambiente laboral en armonía, unión y paz.",
        icon: <Building2 className="w-8 h-8" />,
        tags: ["gobernabilidad", "transparencia", "participación"]
      },
      {
        title: "Internacionalización",
        subtitle: "Convenios Rankings investigación",
        description: "Mary Cruz tiene una visión global para la universidad. Su plan incluye promover la internacionalización mediante convenios con universidades extranjeras que faciliten la movilidad estudiantil y docente.",
        icon: <Briefcase className="w-8 h-8" />,
        tags: ["internacional", "convenios", "movilidad"]
      },
      {
        title: "Innovación Pedagógica",
        subtitle: "Innovación Oferta académica Educación virtual",
        description: "La educación debe adaptarse a los tiempos y necesidades actuales. Se propone actualizar el modelo educativo de la universidad para mejorar la oferta académica tanto en pregrado como en posgrado.",
        icon: <GraduationCap className="w-8 h-8" />,
        tags: ["innovación", "educación", "virtual"]
      },
      {
        title: "Formación y Desarrollo Docente",
        subtitle: "Fortalecimiento Formación Docentes",
        description: "Se cree firmemente en el fortalecimiento continuo de los docentes. La Vicerrectoría Académica impulsará programas de capacitación continua, centrados en el uso de nuevas tecnologías.",
        icon: <Users className="w-8 h-8" />,
        tags: ["formación", "docentes", "capacitación"]
      },
      {
        title: "Fomento a la Investigación",
        subtitle: "Fortalecimiento Investigación Interdisciplinarias",
        description: "Buscará fortalecer la investigación mediante la creación de un fondo competitivo que financie proyectos de alto impacto y publicaciones científicas en revistas indexadas.",
        icon: <Target className="w-8 h-8" />,
        tags: ["investigación", "ciencia", "proyectos"]
      },
      {
        title: "Innovación y Transferencia Tecnológica",
        subtitle: "Innovación Tecnología Progreso",
        description: "La innovación es un motor para el progreso, se planea crear un ecosistema de innovación dentro de la universidad, que incluirá incubadoras de empresas y laboratorios especializados.",
        icon: <Lightbulb className="w-8 h-8" />,
        tags: ["innovación", "tecnología", "emprendimiento"]
      },
      {
        title: "Vinculación con la Sociedad",
        subtitle: "Vinculación Estudiantes Sociedad",
        description: "Para promover un impacto directo en la sociedad, se implementarán proyectos de vinculación orientados a resolver problemas locales y nacionales, alineados con los ODS.",
        icon: <Users2 className="w-8 h-8" />,
        tags: ["vinculación", "sociedad", "desarrollo"]
      },
      {
        title: "Optimización de Recursos",
        subtitle: "Gestión Administrativa Procesos",
        description: "Se implementará un sistema de gestión de recursos basado en indicadores de eficiencia, lo que permitirá un uso transparente y optimizado del presupuesto de la universidad.",
        icon: <DollarSign className="w-8 h-8" />,
        tags: ["gestión", "recursos", "eficiencia"]
      },
      {
        title: "Infraestructura y Tecnología",
        subtitle: "Mejoramiento Bienestar Compromiso",
        description: "La modernización de la infraestructura es fundamental. Se buscará mejorar los espacios físicos y tecnológicos, asegurando instalaciones para la enseñanza y el bienestar.",
        icon: <Building className="w-8 h-8" />,
        tags: ["infraestructura", "tecnología", "modernización"]
      },
      {
        title: "Bienestar y Desarrollo del Talento Humano",
        subtitle: "Remuneraciones Responsabilidades Crecimiento profesional",
        description: "El bienestar de los empleados es una prioridad. Se revisarán las remuneraciones del personal administrativo y se implementarán programas de bienestar laboral.",
        icon: <UserCog className="w-8 h-8" />,
        tags: ["bienestar", "desarrollo", "personal"]
      }
    ];

  const allTags = [...new Set(propuestas.flatMap((p) => p.tags))];

  useEffect(() => {
      if (selectedTags.length === 0) {
        setFilteredPropuestas(propuestas);
      } else {
        const filtered = propuestas.filter((propuesta) =>
          selectedTags.some((tag) => propuesta.tags.includes(tag))
        );
        setFilteredPropuestas(filtered);
        setCurrentIndex(0);
      }
    }, [selectedTags]);

  const handleTagClick = (tag) =>
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
  );

  const handleNavigation = (direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        direction === 'next'
          ? prev === propuestas.length - 1 ? 0 : prev + 1
          : prev === 0 ? propuestas.length - 1 : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#FF8D99] to-[#FF9EA8]">
        <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-center items-center">
            <div className="relative mb-8">
              <img
                src={maryImage}
                alt="Candidato"
                className="w-60 h-50 relative rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
              />
              {showSparkle && (
                <Sparkles
                  className="absolute -top-4 -right-4 w-8 h-8 text-yellow-300 animate-spin"
                  style={{ animationDuration: '3s' }}
                />
              )}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 font-montserrat">
              Mary Cruz Lascano
            </h2>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-white animate-pulse" />
              <span className="text-white font-montserrat">Unidos lo haremos posible</span>
            </div>

            {/* Filtro por tags */}
            <div className="mt-8 w-full">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-gray-500" />
                  <h4 className="text-lg font-semibold text-gray-700">Filtrar por temas</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedTags.includes(tag) ? 'bg-[#42B9E5] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12">
          {/* Right section */}
        </div>
      </div>
  );
};

export default Propuestas;