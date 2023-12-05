import dotenv from 'dotenv';
dotenv.config({
    path:'src/.env'
})
import nodemailer from 'nodemailer';
//REVISAR SI ESTAS LINEAS SON OBLIGATORIAS
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const emailRegister = async (userData) => {
  const {nombre, email, token } = userData
    console.log(`Intentando enviar un correo electronico de activación al usuario ${email}`)
 
       //Creando y enviando el correo 
        //El await lleva espacio
        await transport.sendMail({
          from: 'mayra.ibarra@utxicotepec.edu.mx',
          to: email,
          subject: 'Estadías TIC Verificación de Cuenta',
          text: 'Bienvenido a Estadías TIC',
          html:`<p style="color:white;font-size:24px;background:#63BF18;text-align:center;padding:20px";>EstadíasTIC </p>
          <p style="color:#403831;padding:20px";>Hola ${nombre}, bienvenido a la plataforma Estadías TIC, ahora podrás consultar toda la información referente al proceso de estadías. Te invitamos a dar clic  en el enlace de abajo</p>
          <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}" style="color:white;font-size:20px;background:#63BF18;text-align:center;text-decoration:none;margin-left:300px;padding:10px";>Activar mi cuenta </a>
          <p style="color:gray;padding-left:20px;padding-top:50px";> Atentamente </p>
          <p style="color:gray;padding-left:20px";> Mayra Ibarra- Coordinadora de EstadíasTIC </p>
          <p style="color:#2E5055;padding-left:20px";> Si no te registraste a EstadíasTIC, por favor ignora este mensaje</p
          `

         })   
}


const emailPasswordRecovery = async (userData) => {
    const {nombre, email, token } = userData
    
          await transport.sendMail({
            from: 'mayra.ibarra@utxicotepec.edu.mx',
            to: email,
            subject: 'Reestablece tu contraseña',
            text: 'Recibimos tu petición para reestablecer tu contraseña',
            html:`<p style="color:white;font-size:24px;background:#D9A78B;text-align:center;padding:20px";>EstadíasTIC </p>
            <p style="color:#403831;padding:20px";>Hello ${nombre}, recibimos tu petición para reestablecer tu contraseña, por lo que te pedimos que des clic en el enlace de abajo para volver a tener acceso a EstadíasTIC</p>
            <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/update-password/${token}" style="color:white;font-size:20px;background:#D9A78B;text-align:center;text-decoration:none;margin-left:300px;padding:10px";>Reestablecer mi contraseña </a>
            <p style="color:gray;padding-left:20px;padding-top:50px";> Atentamente </p>
            <p style="color:gray;padding-left:20px";> Mayra Ibarra- Coordinadora de EstadíasTIC </p>
            <p style="color:#D9A78B;padding-left:20px";> Si no solicitaste reestablecer tu contraseña para el sitio EstadíasTIC, por favor ignora este mensaje</p
            `
  
           })   
  }




export {emailRegister, emailPasswordRecovery}