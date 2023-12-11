import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Empresa = db.define('tb_empresas', {
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    giro: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    tel: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    tel2: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sitioweb: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    street: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lat:{
        type:DataTypes.STRING,
        allowNull: false
    },
    long:{
        type:DataTypes.STRING,
        allowNull: false
    },
    image:{
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue: "Por definir"
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }


})

export default Empresa;
