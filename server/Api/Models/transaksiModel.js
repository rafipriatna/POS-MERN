const { DataTypes } = require("sequelize");
const db = require("../../Database/db");

module.exports = db.sequelize.define(
  "tb_transaksi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_penjualan: {
      type: DataTypes.STRING,
    },
    sub_total: {
      type: DataTypes.INTEGER,
    },
    diskon: {
      type: DataTypes.INTEGER,
    },
    potongan_diskon: {
      type: DataTypes.INTEGER,
    },
    grand_total: {
      type: DataTypes.INTEGER,
    },
    bayar: {
      type: DataTypes.INTEGER,
    },
    kembalian: {
      type: DataTypes.INTEGER,
    },
    id_user: {
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
