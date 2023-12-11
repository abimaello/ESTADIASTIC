import {DataTypes} from 'sequelize'
import db from '../config/db.js'
import bcrypt from 'bcrypt';

const Admin=db.define('tb_admins', {
    trabajador: {
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
    genero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    programa: {
        type: DataTypes.STRING,
        allowNull: true
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
        beforeCreate: async (Admin) => {
            const salt = await bcrypt.genSalt(10);
            Admin.password = await bcrypt.hash(Admin.password, salt);
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

Admin.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


export default Admin;