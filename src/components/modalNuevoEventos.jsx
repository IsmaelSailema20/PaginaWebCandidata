import React, { useEffect, useState } from "react";

const ModalNuevoEvento = ({ closeModal, id }) => {
    const [formData, setFormData] = useState({
        titulo_evento_noticia: "",
        descrip_evento_noticia: "",
        lugar_Evt: "",
        fecha: "",
        hora: "",
        tipo: "EVENTO", // Valor predeterminado
        urlImagen: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Unir fecha y hora en un solo valor
        const fechaCompleta = `${formData.fecha} ${formData.hora}`;
        console.log("Fecha unificada:", fechaCompleta);

        // Enviar los datos actualizados
        const dataToSend = {
            ...formData,
            fechaCompleta,
        };

        console.log("Datos del formulario:", dataToSend);
        closeModal(); // Cierra el modal
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                    Registrar un nuevo Elemento
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contenedor en dos columnas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Título */}
                        <div>
                            <label className="block text-gray-600 font-medium">Título</label>
                            <input
                                type="text"
                                name="titulo_evento_noticia"
                                value={formData.titulo_evento_noticia}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
                                placeholder="CORRE CON MARY CRUZ"
                                required
                            />
                        </div>

                        {/* Lugar */}
                        <div>
                            <label className="block text-gray-600 font-medium">Lugar</label>
                            <input
                                type="text"
                                name="lugar_Evt"
                                value={formData.lugar_Evt}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
                                placeholder="AMBATO"
                                required
                            />
                        </div>

                        {/* Fecha */}
                        <div>
                            <label className="block text-gray-600 font-medium">Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
                                required
                            />
                        </div>

                        {/* Hora */}
                        <div>
                            <label className="block text-gray-600 font-medium">Hora</label>
                            <input
                                type="time"
                                name="hora"
                                value={formData.hora}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
                                required
                            />
                        </div>

                        {/* Tipo y URL Imagen en una fila */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            {/* Tipo */}
                            <div>
                                <label className="block text-gray-600 font-medium">Tipo</label>
                                <select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
                                    required
                                >
                                    <option value="EVENTO">EVENTO</option>
                                    <option value="NOTICIA">NOTICIA</option>
                                </select>
                            </div>

                            {/* URL Imagen */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    URL de Imagen
                                </label>
                                <input
                                    type="url"
                                    name="urlImagen"
                                    value={formData.urlImagen}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
                                    placeholder="https://example.com/imagen.jpg"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-gray-600 font-medium">Descripción</label>
                        <textarea
                            name="descrip_evento_noticia"
                            value={formData.descrip_evento_noticia}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring focus:ring-blue-300 outline-none"
                            placeholder="Un día espléndido para hacer deporte..."
                            required
                        ></textarea>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNuevoEvento;