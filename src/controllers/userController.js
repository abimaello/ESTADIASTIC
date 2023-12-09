import e, {request, response} from 'express'
import Alumno from "../models/Alumno.js";
import { generateToken, generateJwt } from "../lib/tokens.js";
import bcrypt from 'bcrypt';
import { check, validationResult } from "express-validator" 
import { json } from "sequelize"

import { emailRegister, emailPasswordRecovery } from "../lib/emails.js";

const formLogin = (request, response) => {

    response.render("../views/auth/login.pug", {
        isLogged: false,
        page: "Login",

    })
}

const formRegister = (request, response) => {

    response.render("../views/auth/register.pug", {
        isLogged: false,
        page: "Registro",

    })
}

const insertarAlumno = async (request, response) => {

    console.log("Intentando registrar los datos del nuevo usuario en la Base de Datos");
    console.log(`matricula: ${request.body.matricula}`)
    console.log(`email: ${request.body.email}`)
    console.log(`password: ${request.body.password}`)
    await check("matricula").notEmpty().withMessage("La matricula es necesaria").isLength({min:6}).run(request)
    await check("email").notEmpty().withMessage("El email es necesario").isLength({min:25, max:25}).withMessage("Se debe usar tu mail escolar").run(request)
    await check("nombre").notEmpty().withMessage("El nombre es necesario").run(request)
    await check("AP").notEmpty().withMessage("El primer apellido es necesario").run(request)
    await check("AM").notEmpty().withMessage("El segundo apellido es necesario ").run(request) //Está doble?
    await check("genero").notEmpty().withMessage("El género es necesario ").run(request)
    await check("edad").notEmpty().withMessage("La edad es necesaria").isLength({max:2}).run(request)
    await check("programa").notEmpty().withMessage("La carrera es necesaria").run(request)
    await check("password").notEmpty().withMessage("La contraseña es necesaria").isLength({min:8, max:20}).withMessage("La contraseña debe tener al menos 8 caracteres").run(request)
    await check("confirm-password").notEmpty().withMessage("Confirmar contraseña es necesario").isLength({min:8, max:20}).equals(request.body.password).withMessage("Las contraseñas no coinciden").run(request)
    
    //response.json(validationResult(request));//*PARA VER EL JSON
    console.log(`El total de errores fueron de: ${validationResult.length} errores de validación`)

    let resultValidate = validationResult(request);
    const userExists = await Alumno.findOne({
        where: {
            matricula: request.body.matricula
        }
    });

    const { matricula,email, nombre, AP, AM, genero, edad, programa, password } = request.body;


    if (userExists) {

        response.render("auth/register.pug", ({
            page: "Registro",
            errors: [{ message: `El usuario con la matrícula ${request.body.matricula} ya se encuentra registrado` }],
            user: {
                matricula: request.body.matricula,
                email: request.body.email
            },


        }))
    }
    else if (resultValidate.isEmpty()) {
        const token = generateToken();
        //*Creando usuario */

        let nuevoAlumno = await Alumno.create({
            matricula,email, nombre, AP, AM, genero_id: genero, edad, programa_id:programa, password, token
                        
        });
        response.render("templates/message.pug", {
            page: "Su cuenta se creó con éxito",
            message: `Enviamos un email a ${email}, para que puedas confirmar tu cuenta`,
            type: "success"

        }) //* Esta linea es la que inserta

        emailRegister({ email, nombre, matricula, token });

    }

    else {
        response.render("auth/register.pug", ({
            page: "Registro",
            errors: resultValidate.array(), alumno: {
                matricula: request.body.matricula,
                email: request.body.email
                        },

        }))
    }


}

const formPasswordUpdate = async (request, response) => {
    const { token } = request.params;
    const alumno = await Alumno.findOne({ where: { token } })
    console.log(alumno);
    if (!alumno) {
        response.render('auth/confirm-account', {
            page: 'Reestablecer contraseña',
            error: true,
            message: 'Tuvimos problemas para verificar tu cuenta.',
            button: 'Acceso no permitido'

        })
    }

    response.render("auth/password-update", {
        isLogged: false,
        page: "Reestablecer contraseña",

    })
}

const formPasswordRecovery = (request, response) => {

    response.render("auth/recovery.pug", {
        page: "Reestablecer contraseña",

    })
}

const confirmAccount = async (request, response) => {

    const tokenRecived = request.params.token
    const userOwner = await Alumno.findOne({
        where: {
            token: tokenRecived
        }
    })
    if (!userOwner) {

        console.log("El token no existe")
        response.render('auth/confirm-account', {
            page: 'Verificación.',
            error: true,
            message: 'Tuvimos problemas para verificar tu cuenta.',
            button: 'Token Inválido'

        })
    }
    else {
        console.log("El token existe");
        userOwner.token = null;
        userOwner.verified = true;
        await userOwner.save();
        // ESTA OPERACION REALIZA EL UPDATE EN LA BASE DE DATOS.
        response.render('auth/confirm-account', {
            page: 'Verificación',
            error: false,
            message: 'Tu cuenta fue confirmada con éxito.',
            button: 'Log in',

        });

    };


}

const updatePassword = async (request, response) => {
    console.log(`Guardando password`);

    await check("password").notEmpty().withMessage("La contraseña es necesaria").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres").run(request)
    await check("confirm-password").notEmpty().withMessage("La contraseña es necesaria").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres").equals(request.body.password).withMessage("Las contraseñas deben coincidir").run(request)
    let resultValidate = validationResult(request);
    if (resultValidate.isEmpty()) {
        const { token } = request.params
        const { password } = request.body
        const user = await Alumno.findOne({ where: { token } })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.token = null;
        await user.save();
        response.render('auth/confirm-account.pug', {
            page: "Recuperar contraseña",
            button: "Log in",
            message: "La contraseña se reestableció correctamente"
        })
    }

    else {
        response.render("auth/password-update.pug", ({
            page: "Registro",
            errors: resultValidate.array()

        }))
    }

}

const emailChangePassword = async (request, response) => {
    console.log(`El usuario ha solicitado cambiar su contraseña por lo que se le enviara un correo electronico a ${request.body.email} con la liga para actualizar su contraseña.`)
    await check("email").notEmpty().withMessage("El email es necesario").isEmail().withMessage("No es un formato válido").run(request);
    let resultValidate = validationResult(request);
    const {nombre, email } = request.body;

    if (resultValidate.isEmpty()) {
        const userExists = await Alumno.findOne({
            where: {
                email: request.body.email
            }
        });

        if (!userExists) { //Si no existe
            console.log(`El usuario: ${email} que esta intentando recuperar su contraseña no existe`);
            response.render("templates/message.pug", {
                page: "Usuario no encontrado",
                part1: `El usuario asociado con el mail: ${email} `,
                part2: ` no se encuentra registrado.`,
                message: `El usuario asociado con el mail ${email} no se encuentra registrado`,
                type: "error"

            });
        }
        else {
            console.log("envio de correo");
            const token = generateToken();
            userExists.token = token;
            userExists.save();

            //TODO: enviar el correo con el nuevo token

            emailPasswordRecovery({ nombre: userExists.nombre, email: userExists.email, token: userExists.token })

            response.render('templates/message', {
                page: 'Email enviado',
                message: `${email}`,
                type: "success"
            });
        }
    }
    else {
        response.render('auth/recovery', {
            page: 'Verificación de cuenta.',
            error: false,
            message: 'Tu cuenta fue verificada exitosamente.',
            button: 'Log in',
            errors: resultValidate.array(), user: {
                name: request.body.name,
                email: request.body.email
            },
        });
    }
    return 0;
}

const authenticateUser = async (request, response) => {
    //Verificar los campos de correo y contraseña
    await check("email").notEmpty().withMessage("El email es necesario").isEmail().withMessage("Se requiere un formato de email").run(request)
    await check("password").notEmpty().withMessage("La contraseña es necesaria").isLength({ max: 20, min: 8 }).withMessage("La contraseña debe contener entre 8 y 20 caracteres").run(request)

    // En caso de errores mostrarlos en pantalla
    let resultValidation = validationResult(request);
    if (resultValidation.isEmpty()) {
        const { email, password } = request.body;
        console.log(`El usuario: ${email} esta intentando acceder a la plataforma`)

        const userExists = await Alumno.findOne({ where: { email } })

        if (!userExists) {
            console.log("El ususario no existe")
            response.render("auth/login.pug", {
                page: "Login",
                errors: [{ message: `El usuario asociado al correo: ${email} no se encontró` }],
                user: {
                    email
                }
            })
        } else {
            console.log("El usuario existe")
            if (!userExists.verified) {
                console.log("Existe, pero no esta verificado");

                response.render("auth/login.pug", {
                    page: "Login",
                    errors: [{ message: `El usuario asociado al correo: ${email} existe pero no se encuentra verificado` }],
                    user: {
                        email
                    }
                })
            } else {
                if (!userExists.verifyPassword(password)) {
                    response.render("auth/login.pug", {
                        page: "Login",
                        errors: [{ message: `El usuario y la contraseña no coinciden` }],
                        user: {
                            email
                        }
                    })
                } else {
                    console.log(`El usuario: ${email} Existe y esta autenticado`);
                    //Generar el token de accesso
                    const token = generateJwt(userExists.id, userExists.id);
                    response.cookie('_token', token, {
                        httpOnly: true,//Solo via navegador, a nivel API no
                        //secure:true  //Esto solo se habilitara en caso de conta con un certificado https


                    }).redirect('/home');
                }
            }
        }

    } else {
        response.render("../views/auth/login.pug", {
            page: "Login",
            errors: resultValidation.array(),
            user: {
                email: request.body.email
            }
        })
    }

    return 0;
}

const userHome = (request, response) => {
   const token = request.cookies._token;
   console.log(token)
    response.render('/home', {
        //showHeader: true,
        page: "Home"
    })
}
export {formLogin, formRegister, insertarAlumno, formPasswordUpdate, formPasswordRecovery, confirmAccount, updatePassword, emailChangePassword, authenticateUser, userHome}