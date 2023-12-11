import {DataTypes} from 'sequelize'
import db from '../config/db.js'


const Contacto=db.define('tbc_contactos', {
    tema: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

export default Contacto;