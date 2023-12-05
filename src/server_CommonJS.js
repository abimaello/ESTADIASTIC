// COMMON JS - No se puede tener EMCS y Common al mismo tiempo 

// Importando la librería de Express para activar la comunicación vía protocolo HTTP

const express =require('express')

//Instanciamos el módulo express de la librería para definir el servidor que atenderá a las peticiones 

const app = express();
const port=3000;  //64400 puertos mtb 1024 son para el SO // Definimos el puerto
app.listen(port, (request,response) => {
    console.log(`El servicio HTTP ha sido iniciado...  El servicio está escuchando por el puerto: ${port}`)}) // Le indicamos a la instancia de express que comience a escuchar las peticiones 

//Routing - Contando las petifciones que se recibieron por medoo de un endpoint (URL)
app.get('/', (request, response) => response.send("Hola Web!!!"))
app.get('/quienEres',(request, response) => response.send("Soy tu primera APP Web en arquitectura SOA (Service Object Oriented)"))
app.get('/queUsas',(request, response) => response.send("Estoy construida en el lenguaje JS y utilizo el microservidor de Express"))
app.get('/misDatos',(request, response) => response.send({nombre:"Abimael Maldonado Vargas", fecha_de_nacimiento:"1991-08-19", matricula: "220280"}))

