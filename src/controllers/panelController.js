import { request, response } from "express";
//import Cathegory from "../models/Cathehory.js";
//import Price from "../models/Price.js";
import { check, validationResult } from "express-validator";
import Empresa from "../models/Empresa.js";
import Estadia from "../models/Estadia.js";

//import Property from '../models/property.js';

const formOrg =async(request, response)=>{

    response.render('admin/alta-empresa.pug',{
        page: 'Registrar nueva empresa',
        showHeader:'true',
    });
}
  
const insertEmpresa =async(request, response)=>{

    await check("nombre").notEmpty().withMessage("El nombre es necesario").isLength({min:5, max:150}).run(request)
    
    await check("giro").notEmpty().withMessage("El giro es necesario").isLength({min:5, max:150}).run(request)

    await check("tel").notEmpty().withMessage("Es necesario al menos un teléfono").isInt({min:10, max:10}).run(request)

    await check("sitioweb").notEmpty().withMessage("Es necesario proporcionar un sitio web").isInt({min:5, max:100}).run(request)

    await check("email").notEmpty().withMessage("Es necesario un mail de contacto").isEmail().withMessage("No tiene formato email").run(request)

    await check("street").notEmpty().withMessage("Calle desconocida").run(request)

    await check("lat").isFloat({min:-90,max:90}).withMessage("Latitud fuera de rango").run(request)

    await check("lng").isFloat({min:-180, max: 180}).withMessage("Longitud fuera de rango.").run(request)

    
let resultValidate = validationResult(request);
console.log(`lat: ${request.body.lat}, long: ${request.body.lng}`)
let data = request.body
console.log(data);
 
const {nombre,giro, tel, sitioweb, email, street, lat, lng} =request.body;
// const prueba = user.userID
console.log(`El usuario logeado es el: ${request.user.id}`)

if(resultValidate.isEmpty()){
    //Creamos
    const insertedEmpresa = await Empresa.create({
        nombre,giro, tel, sitioweb, email, street, lat, long:lng
    })                                                                                                                                              

    const uuidEmpresa = insertedEmpresa.id
    response.redirect(`/panel/addImage/${uuidEmpresa}`)
}
else{
    response.render('admin/alta-empresa.pug', {
        page: 'Registrar nueva empresa',
        showHeader: true,
        data:request.body,
        errors: resultValidate.array(), 
        EmpresaData: {
            nombre,giro, tel, sitioweb, email, street, lat, lng
        },

    });

}
}
const addImage= async(request, response) => { 
    console.log('Visualizar el formulario para agregar imágenes')
   
        const { idProperty } = request.params
    console.log(idProperty)
    //const userID = req.user.id
    const property = await Property.findByPk(idProperty);
    if (!property) {
        return response.redirect('/home')
    }
    if (property.published) {
        return response.redirect('/home')
    }
    //if (request.user.id.toString() !== property.user_ID.toString()) {
     //  return response.redirect('/home')
    //}

    response.render('property/images', {
        property,
        page: `Add image to ${property.title}`,
        idProperty
    })


    }

const loadImage = async (request, response, next) => {
    console.log(`Visualizar el formulario para agregar imagenes`)

    const { idProperty } = request.params
    console.log(idProperty)
    //const userID = req.user.id
    const property = await Property.findByPk(idProperty);
    if (!property) {
        return response.redirect('/home')
    }
    if (property.published) {
        return response.redirect('/home')
    }
    if (request.user.id.toString() !== property.user_ID.toString()) {
        return response.redirect('/home')
    }

    try {
//ALMACENAR LA BASE Y PUBLICAR 
        console.log(request.file);
        property.image = request.file.filename;
        property.published = 1;

        await property.save();

        next();
    } catch (err) {
        console.log(err)
    }
}

const formEstadia = async (request, response) =>{
    response.render('admin/alta-estadia.pug',{
        page: 'Registrar nueva estadia',
        showHeader:'true',
    });
}


const insertEstadia =async(request, response)=>{

    await check("actividades").notEmpty().withMessage("La descripción de las actividades es necesaria").isLength({min:50, max:500}).run(request)
    
    await check("requisitos").notEmpty().withMessage("La descripción de los requisitos es necesaria").isLength({min:50, max:500}).run(request)

    await check("vacantes").notEmpty().withMessage("La cantidad de vacantes es necesaria").isInt({min:1, max:2}).run(request)

    await check("solicitante").notEmpty().withMessage("Es necesario proporcionar el nombre del contacto").isLength({min:5, max:100}).run(request)

    await check("cargo").notEmpty().withMessage("Es necesario el cargo del solicitante").withMessage("No tiene formato email").run(request)

    await check("duracion").notEmpty().withMessage("Es necesaria la duración de la estadía").run(request)

    await check("metodo").notEmpty().withMessage("Es necesario proporcionar el método de selección ").isLength({min:5, max:100}).run(request)

    await check("empresa").notEmpty().withMessage("Es necesario proporcionar el nombre de la empresa").run(request)

    await check("programa").notEmpty().withMessage("Es necesario elegir el programa al que aplica").run(request)

    

    
let resultValidate = validationResult(request);
let data = request.body
console.log(data);
 
const {actividades, requisitos, vacantes, solicitante, cargo, duracion, metodo, nombre,programa} =request.body;
// const prueba = user.userID
//console.log(`El usuario logeado es el: ${request.user.id}`)

if(resultValidate.isEmpty()){
    //Creamos
    const insertedEstadia = await Estadia.create({
        actividades, requisitos, vacantes, solicitante, cargo, duracion, metodo, nombre,programa
    })                                                                                                                                              
    response.render('admin/home.pug',{
        page: 'Listado de estadias',
        showHeader: true,
    })
}

else{
    response.render('admin/alta-estadia.pug', {
        page: 'Registrar nueva estadia',
        showHeader: true,
        data:request.body,
        errors: resultValidate.array(), 
        EstadiaData: {
            actividades, requisitos, vacantes, solicitante, cargo, duracion, metodo, nombre,programa
        },

    });

}
}


const verEstadias =async(request, response)=>{

    response.render('admin/estadias.pug',{
        page: 'Listado de estadías',
        showHeader:'true',
    });
}

const verEmpresas =async(request, response)=>{

    response.render('admin/empresas.pug',{
        page: 'Listado de empresas',
        showHeader:'true',
    });
}


const verPostulaciones =async(request, response)=>{

    response.render('admin/postulaciones.pug',{
        page: 'Listado de postulaciones',
        showHeader:'true',
    });
}








export {  formOrg, insertEmpresa, addImage, loadImage, formEstadia, insertEstadia, verEstadias, verEmpresas, verPostulaciones}