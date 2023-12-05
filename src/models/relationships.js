import Alumno from './Alumno.js';
import Genero from './Genero.js';
import Programa from './Programa.js';


Programa.hasOne(Alumno,{
    foreignKey: 'programa_ID'
})

Genero.hasOne(Alumno,{
    foreignKey: 'genero_ID'
}) //ForeingKey



export{Alumno, Genero, Programa}