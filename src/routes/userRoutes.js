import express, { request, response } from 'express';
import { formLogin, formRegister, insertarAlumno,confirmAccount,formPasswordRecovery,emailChangePassword,authenticateUser,formPasswordUpdate,updatePassword,userHome} from "../controllers/userController.js";


const router = express.Router();
//router.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));
router.get('/', formLogin)
router.get('/register',formRegister)
router.post('/register',insertarAlumno)
router.get("/register", formRegister) //Vista registro  
router.post("/register", insertarAlumno); //Registrar usuario
router.get("/confirm/:token", confirmAccount);//Confirmar correo
router.get("/recovery", formPasswordRecovery); //olvide mi contraseña
router.post("/recovery", emailChangePassword);
router.post("/login", authenticateUser) //Login funcional
router.get("/update-password/:token", formPasswordUpdate); //Comprobar token
router.post("/update-password/:token", updatePassword); //Nuevo passwordrouter.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));//MI ENDPOINT DE PINTADOS
router.get("/home", userHome)//Vista de cada usuario



//router.post('/',registrarus)




 export default router


 


