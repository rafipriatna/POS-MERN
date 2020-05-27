const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const db = require('../../Database/db')

module.exports = db.sequelize.define(
    'tb_users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        nama: {
            type: DataTypes.STRING
        },
        surel: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Surel tidak valid"
                }
            }
        },
        password: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        last_login: {
            type: DataTypes.TIME
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
)