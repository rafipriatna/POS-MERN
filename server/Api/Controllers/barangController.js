const {
    Op
} = require("sequelize")

const Barang = require('../Models/barangModel')
const KategoriBarang = require('../Models/kategoriBarangModel')

// Associations
Barang.belongsTo(KategoriBarang, {
    foreignKey: 'kategori',
    as: 'KB'
})

/* =========================== Barang =========================== */

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
        .findAll({
            include: [{
                model: KategoriBarang,
                as: 'KB'
            }]
        })
        .then(semuaBarang => {
            if (semuaBarang === null)
                return res
                    .status(404)
                    .json({
                        error: "Belum ada data barang"
                    })
            const response = {
                cout: semuaBarang.length,
                keterangan: 'Nama kategori dalam bentuk number, dapat dilihat di GET /barang/kategori',
                barang: semuaBarang.map(barang => {
                    return {
                        id: barang.id,
                        barcode: barang.barcode,
                        nama: barang.nama,
                        kategori: barang.KB.nama,
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
            },
            include: [{
                model: KategoriBarang,
                as: 'KB'
            }]
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
                    kategori: barang.KB.nama,
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

/* =========================== Kategori Barang =========================== */

// Membuat data kategori barang
exports.createKategoriBarang = (req, res, next) => {
    KategoriBarang
        .create({
            nama: req.body.nama,
            keterangan: req.body.keterangan
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

// Mengambil semua kategori barang
exports.getAllKategoriBarang = (req, res, next) => {
    KategoriBarang
        .findAll()
        .then(semuaKategori => {
            if (semuaKategori === null)
                return res
                    .status(404)
                    .json({
                        error: "Belum ada data kategori barang"
                    })
            const response = {
                cout: semuaKategori.length,
                kategori: semuaKategori.map(kategori => {
                    return {
                        id: kategori.id,
                        nama: kategori.nama,
                        keterangan: kategori.keterangan
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

// Mengambil kategori barang berdasarkan id
exports.getKategoriBarangById = (req, res, next) => {
    KategoriBarang
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(kategori => {
            if (kategori === null)
                return res
                    .status(404)
                    .json({
                        error: "Kategori barang tidak ditemukan"
                    })
            const response = {
                cout: kategori.length,
                kategori: {
                    id: kategori.id,
                    nama: kategori.nama,
                    keterangan: kategori.keterangan
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

// Update kategori barang
exports.updateKategoriBarang = (req, res, next) => {
    KategoriBarang
        .update({
            nama: req.body.nama,
            keterangan: req.body.keterangan
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "Kategori barang berhasil diupdate"
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
exports.deleteKategoriBarang = (req, res, next) => {
    KategoriBarang
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "Kategori barang berhasil dihapus"
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