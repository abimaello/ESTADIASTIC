import jsonWebToken from "jsonwebtoken"
import Alumno from "../../models/Alumn.js";


import dotenv from 'dotenv';
dotenv.config({
    path:'src/.env'
})


const protectRoute = async (request, response, next) =>{
    const {_token}= request.cookies
if(!_token){
    //VERIFICAR QUE EL TOKEN EXISTE
    return response.redirect('/login');
}
    //VERIFICAR QUE EL TOKEN ESTË CORRECTO
    try{
        const decoded=jsonWebToken.verify(_token, process.env.JWT_SECRET_HASH_STRING)
        const loggedUser = await Alumno.findByPk(decoded.alumnoID)
        console.log(loggedUser)

         //Almacenar al usuario en el request 
        if (loggedUser){
            request.user=loggedUser
        } 
        else{ 
            return response.redirect('/login')
        }
    }catch(err){

    }
    next(); 
}


export {protectRoute}