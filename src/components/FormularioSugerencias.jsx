import React, { useEffect } from "react";
import ComboBox from "./ComboBox";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import useFieldValidation from "../logic/useFieldValidation";
import { useState } from "react";
import { enviarCorreoConfirmacion } from "../logic/emailService";
import { useSettings } from "../pages/SettingsContext";
const FormElementInput = () => {
  const {
    backgroundColor,
    textColor,
    font,
    cardPrimaryColor,
    cardSecondaryColor,
    cardTextPrimaryColor,
    cardTextSecondaryColor,
  } = useSettings();
  const optionsGenero = ["Masculino", "Femenino", "Prefiero no decirlo"];
  const optionsPersona = [
    "Simpatizante",
    "Militante",
    "Funcionario",
    "Afiliado",
    "Prensa",
    "Líder comunitario",
    "Ciudadano Independiente",
    "Prefiero no decirlo",
  ];
  const [candidatos, setCandidatos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // Opción predeterminada
  const [isEmpty, setIsEmpty] = useState(false);
  // Estados para el valor seleccionado de cada ComboBox
  const [genero, setGenero] = useState("");
  const [tipoPersona, setTipoPersona] = useState("");
  // Hooks de validación para cada campo
  const nombreField = useFieldValidation();
  const apellidoField = useFieldValidation();
  const emailField = useFieldValidation();
  const mensajeField = useFieldValidation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  async function guardar(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    const form = document.getElementById("form-sugerencias");
    const formData = new FormData(form);
    // Añade el ID del candidato al formulario
    if (!selectedOption) {
      setMensajeErrorAlert("Por favor, selecciona un candidato.");
      setShowErrorAlert(true);
      return;
    }
    formData.append("id_candidato", selectedOption);
    for (let [key, value] of formData.entries()) {
      // Considera campos vacíos o el valor "" del ComboBox como inválido
      if (!value.trim() || value === "") {
        setMensajeErrorAlert("Existen campos vacíos o no seleccionados.");
        setShowErrorAlert(true);
        console.warn(
          `El campo "${key}" está vacío o no tiene una opción válida seleccionada.`
        );
        return;
      }
    }

    try {
      const response = await fetch(
        "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/guardarSugerencia.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        const nombre = formData.get("nombre_usuario");
        const apellido = formData.get("apellido_usuario");
        const correo = formData.get("correo_electronico");
        const mensaje =
          "Te notifico que recibimos tu sugerencia de manera exitosa y la vamos a tener en cuenta:";
        const nombreCompleto = nombre + " " + apellido;
        // Mostrar la alerta de éxito
        setShowSuccessAlert(true);

        // Restablecer los valores de los campos
        nombreField.resetField();
        apellidoField.resetField();
        emailField.resetField();
        mensajeField.resetField();
        setGenero("");
        setTipoPersona("");
        setSelectedOption("");
        await enviarCorreoConfirmacion(
          nombreCompleto,
          "devTeam",
          mensaje,
          correo
        );
      } else {
        setMensajeErrorAlert(
          "No se pudo completar la solicitud, inténtelo más tarde."
        );
        setShowErrorAlert(true);
        console.error(
          "Error en la respuesta del servidor:",
          response.statusText
        );
      }
    } catch (error) {
      setShowErrorAlert(true);
      setMensajeErrorAlert(
        "No se pudo completar la solicitud, inténtelo más tarde."
      );
      console.error("Error en la solicitud:", error);
    }
  }
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/ConsultaMiembros.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Transforma los datos en un array de objetos con id y label
        const opcionesCandidatos = data.map((element) => ({
          id: element.id_miembro,
          label: element.nombre_miembro + " / " + element.tipo_miembro,
        }));
        setCandidatos(opcionesCandidatos); // Almacena las opciones en el estado
      })
      .catch((error) => {
        console.error("Error fetching the team members:", error);
      });
  }, []);
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setIsEmpty(false);
  };
  const handleBlur = () => {
    if (!selectedOption) {
      setIsEmpty(true); // Marca el campo como vacío si no se selecciona ninguna opción
    }
  };
  return (
    <>
      {showSuccessAlert && (
        <SuccessAlert
          encabezado="Sugerencia enviada con éxito"
          message="Tu opinión siempre es importante, trabajaremos duro para cumplir con tus expectivas."
          visible={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      {showErrorAlert && (
        <ErrorAlert
          visible={showErrorAlert}
          message={mensajeErrorAlert}
          onClose={() => setShowErrorAlert(false)}
        />
      )}
      <div className="relative bg-slate-100 w-[580px] p-8 m-4 rounded-xl shadow-xl fade-in">
        <form id="form-sugerencias" onSubmit={guardar}>
          <h1
            className="text-4xl  font-bold text-center mb-5"
            style={{ color: textColor, font: font }}
          >
            Sugerencias
          </h1>
          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="relative z-0 w-full mb-5 group">
              <InfoInput label="Nombre" {...nombreField} />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <InfoInput label="Apellido" {...apellidoField} />
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <EmailInput {...emailField} />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="hidden" name="genero" value={genero} />
              <ComboBox
                options={optionsGenero}
                label="Género"
                name={"genero"}
                selectedOption={genero}
                setSelectedOption={setGenero}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="hidden" name="tipo_persona" value={tipoPersona} />
              <ComboBox
                options={optionsPersona}
                label="Tipo de persona"
                name={"tipo_persona"}
                selectedOption={tipoPersona}
                setSelectedOption={setTipoPersona}
              />
            </div>
          </div>
          <div className="relative z-0 w-full group">
            <label
              htmlFor="candidato"
              className=" block text-base font-semibold text-dark"
            >
              Candidato al que se dirige la sugerencia
            </label>
            <select
              id="candidato"
              value={selectedOption} // Vincula el valor del select al estado
              onChange={handleSelectChange}
              onBlur={handleBlur}
              className={`my-5 w-full bg-transparent rounded-md border py-[10px] pr-5 pl-4 text-dark-6 outline-none transition ${
                isEmpty ? "border-red-500" : "border-stroke"
              } focus:border-blue-500 active:border-blue-500 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2`}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              {candidatos.map((candidato) => (
                <option key={candidato.id} value={candidato.id}>
                  {candidato.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <MessageTextarea {...mensajeField} />
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="text-lg px-14 py-3 font-bold text-center rounded-lg  focus:ring-4 focus:outline-none bg-gradient-to-r bg-blue-600 text-white p-3  shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormElementInput;

const InfoInput = ({ label, value, isEmpty, handleBlur, handleChange }) => {
  return (
    <>
      <label className="mb-[10px] block text-base text-dark font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          name={label === "Nombre" ? "nombre_usuario" : "apellido_usuario"}
          type="text"
          value={value}
          placeholder={label === "Nombre" ? "Juan" : "Pérez"}
          className={`w-full bg-transparent rounded-md border py-[10px] pr-3 pl-12 text-dark-6 outline-none transition ${
            isEmpty ? "border-red-500" : "border-stroke"
          }`}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.72 12.886a4.167 4.167 0 0 1 2.947-1.22h6.666a4.167 4.167 0 0 1 4.167 4.167v1.666a.833.833 0 1 1-1.667 0v-1.666a2.5 2.5 0 0 0-2.5-2.5H6.667a2.5 2.5 0 0 0-2.5 2.5v1.666a.833.833 0 1 1-1.667 0v-1.666a4.17 4.17 0 0 1 1.22-2.947ZM10 3.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.166 2.5a4.167 4.167 0 1 1 8.333 0 4.167 4.167 0 0 1-8.333 0Z"
              opacity={0.8}
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#9CA3AF"
            />
          </svg>
        </span>
      </div>
    </>
  );
};

const EmailInput = ({ value, isEmpty, handleBlur, handleChange }) => {
  return (
    <>
      <label className="mb-[10px] block text-base font-semibold text-dark ">
        Email
      </label>
      <div className="relative">
        <input
          name="correo_electronico"
          type="email"
          value={value}
          placeholder="info@yourmail.com"
          className={`w-full bg-transparent rounded-md border py-[10px] pr-3 pl-12 text-dark-6 outline-none transition ${
            isEmpty ? "border-red-500" : "border-stroke"
          }`}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              opacity={0.8}
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#9CA3AF"
            >
              <path d="M3.334 4.167A.838.838 0 0 0 2.501 5v10c0 .456.377.833.833.833h13.333a.838.838 0 0 0 .834-.833V5a.838.838 0 0 0-.834-.833H3.334ZM.834 5c0-1.377 1.123-2.5 2.5-2.5h13.333c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.334a2.505 2.505 0 0 1-2.5-2.5V5Z" />
              <path d="M.985 4.522a.833.833 0 0 1 1.16-.205l7.856 5.499 7.855-5.5a.833.833 0 1 1 .956 1.366l-8.333 5.833a.833.833 0 0 1-.956 0L1.19 5.682a.833.833 0 0 1-.205-1.16Z" />
            </g>
          </svg>
        </span>
      </div>
    </>
  );
};

const MessageTextarea = ({ value, isEmpty, handleBlur, handleChange }) => {
  return (
    <>
      <label className="mb-[10px] block text-base font-semibold text-dark ">
        Mensaje
      </label>
      <div className="relative">
        <textarea
          name="sugerencia"
          value={value}
          rows="6"
          placeholder="Escribe tu mensaje!"
          className={`w-full bg-transparent rounded-md border p-3 pl-12 text-dark-6 outline-none transition ${
            isEmpty ? "border-red-500" : "border-stroke"
          }`}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <span className="absolute top-[18px] left-4">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity={0.8}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.56622 3.23223C2.03506 2.76339 2.67094 2.5 3.33398 2.5H9.16732C9.62755 2.5 10.0006 2.8731 10.0006 3.33333C10.0006 3.79357 9.62755 4.16667 9.16732 4.16667H3.33398C3.11297 4.16667 2.90101 4.25446 2.74473 4.41074C2.58845 4.56702 2.50065 4.77899 2.50065 5V16.6667C2.50065 16.8877 2.58845 17.0996 2.74473 17.2559C2.90101 17.4122 3.11297 17.5 3.33398 17.5H15.0006C15.2217 17.5 15.4336 17.4122 15.5899 17.2559C15.7462 17.0996 15.834 16.8877 15.834 16.6667V10.8333C15.834 10.3731 16.2071 10 16.6673 10C17.1276 10 17.5006 10.3731 17.5006 10.8333V16.6667C17.5006 17.3297 17.2373 17.9656 16.7684 18.4344C16.2996 18.9033 15.6637 19.1667 15.0006 19.1667H3.33398C2.67094 19.1667 2.03506 18.9033 1.56622 18.4344C1.09738 17.9656 0.833984 17.3297 0.833984 16.6667V5C0.833984 4.33696 1.09738 3.70107 1.56622 3.23223Z"
                fill="#9CA3AF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6673 2.39909C16.4195 2.39909 16.1818 2.49754 16.0066 2.67278L8.25314 10.4262L7.81264 12.1882L9.57463 11.7477L17.3281 3.99427C17.5033 3.81903 17.6018 3.58135 17.6018 3.33352C17.6018 3.0857 17.5033 2.84802 17.3281 2.67278C17.1528 2.49754 16.9152 2.39909 16.6673 2.39909ZM14.8281 1.49427C15.3159 1.00647 15.9775 0.732422 16.6673 0.732422C17.3572 0.732422 18.0188 1.00647 18.5066 1.49427C18.9944 1.98207 19.2684 2.64367 19.2684 3.33352C19.2684 4.02338 18.9944 4.68498 18.5066 5.17278L10.5899 13.0894C10.4831 13.1962 10.3493 13.272 10.2028 13.3086L6.86945 14.142C6.58547 14.213 6.28506 14.1298 6.07808 13.9228C5.8711 13.7158 5.78789 13.4154 5.85888 13.1314L6.69222 9.79808C6.72885 9.65155 6.80461 9.51773 6.91141 9.41093L14.8281 1.49427Z"
                fill="#9CA3AF"
              />
            </g>
          </svg>
        </span>
      </div>
    </>
  );
};
