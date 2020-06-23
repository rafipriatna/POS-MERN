const { DataTypes } = require("sequelize");
const db = require("../../Database/db");

module.exports = db.sequelize.define(
  "tb_penjualan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_penjualan: {
      type: DataTypes.STRING,
    },
    id_barang: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    jumlah: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    tanggal: {
      type: DataTypes.TIME,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
