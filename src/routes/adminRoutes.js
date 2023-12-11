import express, { request, response } from 'express';
import {  formLogin, confirmAccount,formPasswordRecovery,emailChangePassword,authenticateUser,formPasswordUpdate,updatePassword,userHome} from "../controllers/adminController.js";




const router = express.Router();
//router.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));

router.get("/confirmA/:token", confirmAccount);//Confirmar correo
router.get("/recoveryA", formPasswordRecovery); //olvide mi contraseña
router.post("/recoveryA", emailChangePassword);
router.get("/loginA", formLogin)
router.post("/loginA", authenticateUser) //Login funcional
router.get("/update-passwordA/:token", formPasswordUpdate); //Comprobar token
router.post("/update-passwordA/:token", updatePassword); //Nuevo passwordrouter.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));//MI ENDPOINT DE PINTADOS
router.get("/home", userHome)//Vista de cada usuario


//router.post('/',registrarus)




 export default router


 


