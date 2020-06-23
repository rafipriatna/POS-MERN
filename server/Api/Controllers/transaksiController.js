const Transaksi = require("../Models/transaksiModel");

exports.createTransaksi = (req, res, next) => {
  Transaksi.create({
    kode_penjualan: req.body.kode_penjualan,
    sub_total: req.body.sub_total,
    diskon: req.body.diskon,
    potongan_diskon: req.body.potongan_diskon,
    grand_total: req.body.grand_total,
    bayar: req.body.bayar,
    kembalian: req.body.kembalian,
    id_user: req.body.id_user,
    tanggal: new Date(),
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
