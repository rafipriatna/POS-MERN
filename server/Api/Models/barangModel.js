const {DataTypes} = require('sequelize');
const db = require('../../Database/db')

module.exports = db
    .sequelize
    .define('tb_barang', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        barcode: {
            type: DataTypes.STRING
        },
        nama: {
            type: DataTypes.STRING
        },
        kategori: {
            type: DataTypes.INTEGER
        },
        satuan: {
            type: DataTypes.STRING
        },
        harga_beli: {
            type: DataTypes.INTEGER
        },
        harga_jual: {
            type: DataTypes.INTEGER
        },
        stok: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })