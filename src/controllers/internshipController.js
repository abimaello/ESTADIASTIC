import { request, response } from "express";
//import Cathegory from "../models/Cathehory.js";
//import Price from "../models/Price.js";
import { check, validationResult } from "express-validator";
import Contacto from "../models/Contacto.js";
//import Property from '../models/property.js';

const viewInternships= async(request, response)=>{

    response.render('internships/internships.pug',{
        page: 'Estadías disponibles',
        showHeader:'true',
    });
}

const contactForm= async(request, response)=>{

    response.render('internships/contact.pug',{
        page: 'Contacta al administrador',
        showHeader:'true',
    });
}


const contactAdmin = async(request, response)=>{

    await check("tema").notEmpty().withMessage("El motivo es obligatorio").run(request)
    
    await check("descripcion").notEmpty().withMessage("La descripción es obligatoria").isLength({min:50, max:150}).withMessage("Te pedimos explicar a detalle el motivo de tu mensaje").run(request)

    let resultValidate = validationResult(request);
    let data = request.body
    console.log(data);

    const {tema, descripcion} =request.body;
    // const prueba = user.userID
    console.log(`El usuario logeado es el: ${request.alumno.id}`) //puede ser user

    if(resultValidate.isEmpty()){
        //Creamos
        const guardarContacto = await Contacto.create({
            tema, descripcion, user_id:request.user.id
        })     
        response.redirect(`/templates/message.pug`)
        
    }
    else{
        response.render('property/contact.pug', {
            page: 'Contacta al administrador',
            showHeader: true,
            data:request.body,
            errors: resultValidate.array(), 
            contactData: {
                tema, descripcion
            },
    
        });
    
    }
    }     

const viewSubmits = async (request, response) =>{
    response.render('internships/submits.pug',{
        page: 'Tus postulaciones',
        showHeader:'true',
    });
}
           

  



export { viewInternships, contactForm, contactAdmin, viewSubmits}