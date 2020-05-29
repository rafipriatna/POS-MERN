const Penjualan = require('../Models/penjualanModel')

// Membuat data penjualan
exports.createPenjualan = (req, res, next) => {
    Penjualan
        .create({
            kode_penjualan: req.body.kode_penjualan,
            id_barang: req.body.id_barang,
            jumlah: req.body.jumlah,
            total: req.body.total,
            tanggal: req.body.tanggal
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

// Mengambil semua penjualan
exports.getAllPenjualan = (req, res, next) => {
    Penjualan
        .findAll()
        .then(semuaPenjualan => {
            if (semuaPenjualan === null)
                return res
                    .status(404)
                    .json({
                        error: "Belum ada data penjualan"
                    })
            const response = {
                cout: semuaPenjualan.length,
                penjualan: semuaPenjualan.map(penjualan => {
                    return {
                        id: penjualan.id,
                        kode_penjualan: penjualan.kode_penjualan,
                        id_barang: penjualan.id_barang,
                        jumlah: penjualan.jumlah,
                        total: penjualan.total,
                        tanggal: penjualan.tanggal
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

// Mengambil penjualan berdasarkan kode penjualan
exports.getPenjualanByKodePenjualan = (req, res, next) => {
    Penjualan
        .findOne({
            where: {
                kode_penjualan: req.params.kode_penjualan
            }
        })
        .then(penjualan => {
            if (penjualan === null)
                return res
                    .status(404)
                    .json({
                        error: "Penjualan tidak ditemukan"
                    })
            const response = {
                penjualan: {
                    id: penjualan.id,
                    kode_penjualan: penjualan.kode_penjualan,
                    id_barang: penjualan.id_barang,
                    jumlah: penjualan.jumlah,
                    total: penjualan.total,
                    tanggal: penjualan.tanggal
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

// Update jumlah penjualan per item
exports.updateOneItemPenjualan = (req, res, next) => {
    Penjualan
        .update(req.body, {
            where: {
                id: req.params.id
            }
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

// Delete penjualan berdasarkan id
exports.deleteOnePenjualan = (req, res, next) => {
    Penjualan
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "Penjualan berhasil dihapus"
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