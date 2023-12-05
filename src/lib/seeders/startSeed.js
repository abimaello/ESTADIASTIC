/*Para insertar multiples datos en la base jaja */
import {exit} from 'node:process'
import db from '../../config/db.js'

import Genero from '../../models/Genero.js'
import generos from './generoSeed.js'
import Programa from '../../models/Programa.js'
import programas from './programaSeed.js'


const importData = async () => {
    try{
        //Autenticar
        await db.authenticate()
        //Generar columnas
        await db.sync()
        //Importar los datos
        await Promise.all([ Genero.bulkCreate(generos), Programa.bulkCreate(programas)])
        console.log(`Se han importado los datos de las tablas catalogo de manera correcta`);
        exit
    }catch(err){
        console.log(err)
        exit(1);
    }

}

if(process.argv[2] === "-i"){
    importData();
}


const deleteData = async () => {
    try{
        const queryResetGenero = "ALTER TABLE tbc_categories AUTO_INCREMENT = 1;"
        const queryResetPrograma = "ALTER TABLE tbc_prices AUTO_INCREMENT = 1;"
        await Promise.all([Genero.destroy({
            where:{},
            truncate:false
        }),
        Programa.destroy({
            where:{},
            truncate:false
        })])

        await Promise.all([
            db.query(queryResetGenero,{
            raw:true
            
        }),
            db.query(queryResetPrograma, {
            raw:true
        })])
    }catch(err){
        console.log(err)
            exit(1);
    }
}

if(process.argv[2] === "-d"){
    deleteData();
}
//0 node, 1 seeder, 2 argumento