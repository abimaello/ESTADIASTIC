import {DataTypes} from 'sequelize'
import db from '../config/db.js'


const Programa = db.define('tbc_programa',{
    genero:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

export default Programa