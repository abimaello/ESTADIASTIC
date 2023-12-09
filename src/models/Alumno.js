import {DataTypes} from 'sequelize'
import db from '../config/db.js'
import bcrypt from 'bcrypt';

const Alumno=db.define('tb_alumnos', {
    matricula: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AP: {
        type: DataTypes.STRING,
        allowNull: false
    },

    AM: {
        type: DataTypes.STRING,
        allowNull: true
    },
    

    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
   
    
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type:DataTypes.STRING,
        defaultValue:""
    },

    
    verified:{ 
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    
},
{
    hooks: {
        beforeCreate: async (Alumno) => {
            const salt = await bcrypt.genSalt(10);
            Alumno.password = await bcrypt.hash(Alumno.password, salt);
        }
    },
    scopes: {
        deletePassword: {
            attributes: {
                exclude:
                    ["password", "token", "verified", "createdAt", "updatedAt"]
            }
        }
    }
});

Alumno.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


export default Alumno;