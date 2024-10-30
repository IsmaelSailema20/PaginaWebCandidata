import emailjs from 'emailjs-com';

// Configuración de credenciales de EmailJS
const serviceID = 'service_tyoirin';
const templateID = 'template_bipqmdj';
const userID = '2lP9kitCCyMOGtVjW';

    export const enviarCorreoConfirmacion = async (toName, fromName, message,correo) => {
        const templateParams = {
          nombre: toName,
          from_name: fromName,
          mensaje: message,
          to_email: correo,
        };

  try {
    const response = await emailjs.send(serviceID, templateID, templateParams, userID);

    if (response.status === 200) {
      console.log('Correo enviado correctamente');
    } else {
      console.error('Error al enviar el correo:', response.text);
    }
  } catch (error) {
    console.error('Error en el envío de correo:', error);
  }
};
