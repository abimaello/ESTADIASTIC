import express, { request, response } from 'express';
import { formLogin, formRegister, formAdmon, confirmAccount,formPasswordRecovery,emailChangePassword,authenticateUser,formPasswordUpdate,updatePassword,userHome, insertUSer, selectType} from "../controllers/userController.js";
import Genero from '../models/Genero.js';
import Programa from '../models/Programa.js';
import {  insertarAdmon } from '../controllers/adminController.js';

const router = express.Router();
//router.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));
//router.get('/', formLogin)
router.get('/', selectType)
router.get('/student', formLogin)
router.get("/register", formRegister) //Vista registro  
router.get("/registerAdmin",formAdmon)
router.post("/register", insertUSer); //Registrar usuario
router.post("/registerAdmin", insertarAdmon)
router.get("/confirm/:token", confirmAccount);//Confirmar correo
router.get("/recovery", formPasswordRecovery); //olvide mi contraseña
router.post("/recovery", emailChangePassword);
router.post("/login", authenticateUser) //Login funcional
router.get("/update-password/:token", formPasswordUpdate); //Comprobar token
router.post("/update-password/:token", updatePassword); //Nuevo passwordrouter.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));//MI ENDPOINT DE PINTADOS
router.get("/home", userHome)//Vista de cada usuario



//router.post('/',registrarus)




 export default router


 


