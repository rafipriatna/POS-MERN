const {
    Op
} = require("sequelize")

const Barang = require('../Models/barangModel')

// Membuat data barang
exports.createBarang = (req, res, next) => {
    Barang
        .create({
            barcode: req.body.barcode,
            nama: req.body.nama,
            kategori: req.body.kategori,
            satuan: req.body.satuan,
            harga_beli: req.body.harga_beli,
            harga_jual: req.body.harga_jual,
            stok: req.body.stok
        })
        .then(result => {
            res
                .status(200)
                .json(result)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Mengambil semua barang
exports.getAllBarang = (req, res, next) => {
    Barang
        .findAll()
        .then(semuaBarang => {
            if (semuaBarang === null)
                return res
                    .status(404)
                    .json({
                        error: "Belum ada data barang"
                    })
            const response = {
                cout: semuaBarang.length,
                barang: semuaBarang.map(barang => {
                    return {
                        id: barang.id,
                        barcode: barang.barcode,
                        nama: barang.nama,
                        kategori: barang.kategori,
                        satuan: barang.satuan,
                        harga_beli: barang.harga_beli,
                        harga_jual: barang.harga_jual,
                        stok: barang.stok
                    }
                })
            }
            res
                .status(200)
                .json(response)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Mengambil barang berdasarkan id
exports.getBarangById = (req, res, next) => {
    Barang
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(barang => {
            if (barang === null)
                return res
                    .status(404)
                    .json({
                        error: "Barang tidak ditemukan"
                    })
            const response = {
                cout: barang.length,
                barang: {
                    id: barang.id,
                    barcode: barang.barcode,
                    nama: barang.nama,
                    kategori: barang.kategori,
                    satuan: barang.satuan,
                    harga_beli: barang.harga_beli,
                    harga_jual: barang.harga_jual,
                    stok: barang.stok
                }
            }
            res
                .status(200)
                .json(response)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Update barang
exports.updateBarang = (req, res, next) => {
    Barang
        .update({
            barcode: req.body.barcode,
            nama: req.body.nama,
            kategori: req.body.kategori,
            satuan: req.body.satuan,
            harga_beli: req.body.harga_beli,
            harga_jual: req.body.harga_jual,
            stok: req.body.stok
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "Barang berhasil diupdate"
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}

// Delete barang
exports.deleteBarang = (req, res, next) => {
    Barang
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "Barang berhasil dihapus"
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
}