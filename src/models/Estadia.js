import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Estadia = db.define('tb_estadias', {
    actividades: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    requisitos: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    vacantes: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    solicitante: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    metodo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    empresa: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    programa: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    
})

export default Estadia;


