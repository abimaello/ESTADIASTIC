import express, { request, response } from 'express';
//import { formLogin, formRegister, formAdmon, confirmAccount,formPasswordRecovery,emailChangePassword,authenticateUser,formPasswordUpdate,updatePassword,userHome, insertUSer, selectType} from "../controllers/userController.js";
//import Genero from '../models/Genero.js';
//import Programa from '../models/Programa.js';
import { viewInternships, contactForm, contactAdmin, viewSubmits } from '../controllers/internshipController.js';

const router = express.Router();
router.get('/',viewInternships )
router.get('/contact',contactForm )
router.post('/contact',contactAdmin )
router.get('/submit', viewSubmits)



 export default router