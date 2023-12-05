import {DataTypes} from 'sequelize'
import db from '../config/db.js'


const Genero =db.define('tbc_genero',{
    Genero:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

export default Genero;

