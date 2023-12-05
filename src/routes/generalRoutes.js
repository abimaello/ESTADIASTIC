import express, { request, response } from 'express'; //EMCS6

const router = express.Router();


//Routing - Contando las petifciones que se recibieron por medoo de un endpoint (URL)
//router.get('/', (request, response) => response.send("Hi there, from POST!!!")) DESCOMENTAR PRACTICA
router.get('/',(request,response)=> response.render("layout/index.pug",{page: "Home"}))

//router.get('/',(request,response)=> response.render("layout/index.pug")) //PRÁCTICA 22
router.get('/quienEres',(request, response) => response.send("Soy tu primera APP Web en arquitectura SOA (Service Object Oriented)"))
router.get('/queUsas',(request, response) => response.send("Estoy construida en el lenguaje JS y utilizo el microservidor de Express"))
router.get('/misDatos',(request, response) => response.send({nombre:"Abimael Maldonado Vargas", fecha_de_nacimiento:"1991-08-19", matricula: "220280"}))
router.get('/fecha',(request, response)=> {const fechaActual= new Date(); response.send(`La fecha de hoy es ${fechaActual}`) })

// RUTAS A TRAVÉS DE POST 
router.post('/', (request,response) => response.send ("Hello WEB  from POST"))


// RUTAS A TRAVÉS DE PUT
router.put('/', (request,response) => response.send ("Hi there,  you are trying to update all data object through PUT"))

// RUTAS A TRAVÉS DE PATCH
router.patch('/', (request,response) => response.send ("Hi there,  you are trying to update all data object through PATCH"))

// RUTAS A TRAVÉS DE DELETE
router.delete('/', (request,response) => response.send ("Hi there,  are you sure you want to DELETE this DATA?"))



export default router;