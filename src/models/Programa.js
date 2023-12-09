import {DataTypes} from 'sequelize'
import db from '../config/db.js'


const Programa = db.define('tbc_programas',{
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
})

export default Programa