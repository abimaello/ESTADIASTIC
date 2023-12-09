import {DataTypes} from 'sequelize'
import db from '../config/db.js'


const Genero =db.define('tbc_generos',{
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
})

export default Genero;



