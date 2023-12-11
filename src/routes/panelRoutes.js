import express, { request, response } from 'express';
//import { formLogin, formRegister, formAdmon, confirmAccount,formPasswordRecovery,emailChangePassword,authenticateUser,formPasswordUpdate,updatePassword,userHome, insertUSer, selectType} from "../controllers/userController.js";
//import Genero from '../models/Genero.js';
//import Programa from '../models/Programa.js';
//import { viewInternships, contactForm, contactAdmin, viewSubmits } from '../controllers/internshipController.js';
import { formOrg, insertEmpresa, addImage, loadImage, formEstadia, insertEstadia, verEstadias, verEmpresas, verPostulaciones} from '../controllers/panelController.js';
import upload from '../lib/middlewares/uploadImage.js';
import { protectRoute } from '../lib/middlewares/protectRoute.js';


const router = express.Router();

router.get('/',formOrg )
router.post('/', insertEmpresa)

//router.post('/create', protectRoute, saveNewProperty)
router.get('/addImage/:idProperty', protectRoute, addImage);
//router.post('/addImage/:idProperty',protectRoute, upload.single('image'), loadImage) -- DESCOMENTAR CUANDO MULTER
router.get('/alta-estadia', formEstadia)
router.post('/alta-estadia', insertEstadia)
router.get('/estadias', verEstadias)
router.get('/empresas', verEmpresas)
router.get('/postulaciones', verPostulaciones)

 export default router