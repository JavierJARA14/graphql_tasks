// services/emailService.js
const nodemailer = require("nodemailer");

// 1. Configurar el transporter (igual que en tu ejemplo de Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_SENDER,     // Tu correo de Gmail
    pass: process.env.EMAIL_PASSWORD  // Tu "Contraseña de Aplicación" de Google
  }
});

// 2. Definir el correo de destino (como es el mismo, lo ponemos aquí)
// Es buena práctica ponerlo en .env también
const TEST_EMAIL = process.env.TEST_EMAIL || 'tu-correo-admin@gmail.com';

/**
 * Envía un correo notificando que una tarea fue completada
 * @param {object} task - El objeto de la tarea que se completó
 */
exports.sendTaskCompletionEmail = async (task) => {

  const mailOptions = {
    from: `"Notificador de Tareas" <${process.env.EMAIL_SENDER}>`,
    to: TEST_EMAIL,
    subject: `Tarea Completada: ${task.name}`,
    html: `
      <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 25px 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          
          <h2 style="color: #4CAF50; text-align: center; margin-top: 0;">¡Tarea Completada!</h2>
          
          <p style="font-size: 16px; color: #333;">
            Hola,
          </p>
          <p style="font-size: 16px; color: #333;">
            Se ha marcado como completada la siguiente tarea:
          </p>

          <div style="background-color: #f9f9f9; border: 1px solid #eee; padding: 15px 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
            <strong style="font-size: 18px; color: #000;">
              ${task.name}
            </strong>
          </div>

          <p style="font-size: 16px; color: #333;">
            ¡Buen trabajo!
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

          <p style="font-size: 12px; color: #888; text-align: center;">
            Este es un correo automático del Sistema de Tareas.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de tarea completada enviado para ID: ${task.id}`);
  } catch (error) {
    console.error("Error al enviar el correo de tarea:", error);
  }
};