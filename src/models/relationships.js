import Alumno from './User.js';
import Genero from './Genero.js';
import Programa from './Programa.js';
import Contacto from './Contacto.js';
import Empresa from './Empresa.js';
import Estadia from './Estadia.js';

Alumno.belongsTo(Programa,{
    foreignKey:'alumno_id'
})

Genero.hasOne(Alumno,{
    foreignKey: 'genero_id'
}) //ForeingKey


Alumno.hasMany(Contacto,{
    foreignKey: 'alumno_id'
})


Empresa.hasMany(Estadia,{
    foreignKey: 'empresa_id'
})

export{Alumno, Empresa}



