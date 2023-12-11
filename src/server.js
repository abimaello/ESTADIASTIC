// COMMON JS 

// Importando la librería de Express para activar la comunicación vía protocolo HTTP
import express from 'express';
import router from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import intershipRoutes from './routes/internshipRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import db from './config/db.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import Alumno from './models/Alumno.js';
import Genero from './models/Genero.js';
import Programa from './models/Programa.js';
import panelRoutes from './routes/panelRoutes.js'

//import {User, Property} from './models/Links.js';
import dotenv from 'dotenv';
//import propertyRoutes from './routes/propertyRoutes.js';
dotenv.config({path:'src/.env'})


//Instanciamos el módulo express de la librería para definir el servidor que atenderá a las peticiones 



const app = express();
const port=process.env.SERVER_PORT //64400 puertos mtb 1024 son para el SO // Definimos el puerto

//Queda pendiente response  re.render() Que pinta una interfaz grafica a través de un motor de plantillas

//Habilitar cookie parser para leer, escribir y eliminar las cookies del navegador 

app.use(cookieParser({
    cookie:true
}));
//Habilitar CSRF Protection 
//app.use(csrf( {cookie:true }));


//Agregar y configurar el TemplateEngine
app.set('view engine', 'pug')
app.set('views', './src/views')

//Definimos la carpeta para los recursos públicos 
app.use(express.static('./src/public'))

// HABILITAR LA PROTECCION A TRAVÉS DE HELMET
/*app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"],
        scriptSrc:["'self'",'https://unpkg.com','https://cdnjs.cloudflare.com'],
        styleSrc:["'self'",'https://unpkg.com','https://cdnjs.cloudflare.com',"'unsafe-inline'"],
        imgSrc:["'self'", 'data', 'https://unpkg.com'],
        fontSrc:["'self",'https://unpkg.com' ]
    }
}
));*/

//Habilitamos el acceso a las propiedades del DOM 
app.use(express.urlencoded({extended:false}))

app.listen(port, (request,response) => {
    console.log(`El servicio HTTP ha sido iniciado...  El servicio está escuchando por el puerto: ${process.env.SERVER_PORT}`)}) // Le indicamos a la instancia de expresss que comience a escuchar las peticiones 
 
 app.use('/', router)
 app.use('/login', userRoutes)
 app.use('/internships',intershipRoutes)
 app.use('/loginAdmon', adminRoutes)
 app.use('/panel',panelRoutes)
 //app.use('/properties', propertyRoutes)

 
 try{
    db.authenticate();
    console.log("La conexion a la base de datos ha sido exitosa")
    db.sync();
    console.log("Se han sincronizado las tablas existentes con la base de datos")

}catch (error){
    console.log("Hubo un error al intentarme conectarme a la bd")
    console.log(error)
}