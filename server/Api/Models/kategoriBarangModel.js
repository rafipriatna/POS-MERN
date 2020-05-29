const {DataTypes} = require('sequelize')
const db = require('../../Database/db')

module.exports = db
    .sequelize
    .define('tb_kategori_barang', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama: {
            type: DataTypes.STRING
        },
        keterangan: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })