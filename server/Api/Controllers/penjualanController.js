const { Op } = require("sequelize");

const Penjualan = require("../Models/penjualanModel");
const Barang = require("../Models/barangModel");

// Associations
Penjualan.belongsTo(Barang, {
  foreignKey: "id_barang",
  as: "BRG",
});

// Membuat data penjualan
exports.createPenjualan = (req, res, next) => {
  // Cari satu penjualan yang kode barang & id_barangnya sesuai yg diinput
  Penjualan.findOne({
    where: {
      [Op.and]: [
        { kode_penjualan: req.body.kode_penjualan },
        { id_barang: req.body.id_barang },
      ],
    },
    include: [
      {
        model: Barang,
        as: "BRG",
      },
    ],
  }).then((penjualan) => {
    // Jika ada penjualan dengan kode penjualan dan id barang yang sama
    if (penjualan !== null) {
      // Maka update jumlah barang yang dibeli
      Penjualan.update(
        {
          jumlah: penjualan.jumlah + 1,
          total: penjualan.total + penjualan.BRG.harga_jual,
        },
        {
          where: {
            id: penjualan.id,
          },
        }
      ).then((result) => {
        Barang.findOne({
          where: {
            id: req.body.id_barang,
          },
        })
          .then((barang) => {
            // Update stoknya
            Barang.update(
              {
                stok: barang.stok - 1,
              },
              {
                where: {
                  id: req.body.id_barang,
                },
              }
            )
              .then(() => {
                // result dari update penjualan
                res.status(200).json(result);
              })
              .catch((err) => {
                // Catch update barang
                res.status(500).json({
                  error: err,
                });
              });
          })
          .catch((err) => {
            // Catch find one barang
            res.status(500).json({
              error: err,
            });
          });
      });
    } else {
      // Jika tidak ada penjualan dengan kode penjualan dan id barang yang sama
      // Maka buat baru
      Penjualan.create({
        kode_penjualan: req.body.kode_penjualan,
        id_barang: req.body.id_barang,
        jumlah: req.body.jumlah,
        total: req.body.total,
        tanggal: new Date(),
      })
        .then((result) => {
          // Update jumlah stok barang
          // Cari satu barang dengan id barang yang diinput
          Barang.findOne({
            where: {
              id: req.body.id_barang,
            },
          })
            .then((barang) => {
              // Update stoknya
              Barang.update(
                {
                  stok: barang.stok - req.body.jumlah,
                },
                {
                  where: {
                    id: req.body.id_barang,
                  },
                }
              )
                .then(() => {
                  // result dari create penjualan
                  res.status(200).json(result);
                })
                .catch((err) => {
                  // Catch update barang
                  res.status(500).json({
                    error: err,
                  });
                });
            })
            .catch((err) => {
              // Catch find one barang
              res.status(500).json({
                error: err,
              });
            });
        })
        .catch((err) => {
          // Catch create penjualan
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

// Mengambil semua penjualan
exports.getAllPenjualan = (req, res, next) => {
  Penjualan.findAll()
    .then((semuaPenjualan) => {
      if (semuaPenjualan === null)
        return res.status(404).json({
          error: "Belum ada data penjualan",
        });
      const response = {
        count: semuaPenjualan.length,
        penjualan: semuaPenjualan.map((penjualan) => {
          return {
            id: penjualan.id,
            kode_penjualan: penjualan.kode_penjualan,
            id_barang: penjualan.id_barang,
            jumlah: penjualan.jumlah,
            total: penjualan.total,
            tanggal: penjualan.tanggal,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Mengambil penjualan berdasarkan kode penjualan
exports.getPenjualanByKodePenjualan = (req, res, next) => {
  Penjualan.findAll({
    where: {
      kode_penjualan: req.params.kode_penjualan,
    },
    include: [
      {
        model: Barang,
        as: "BRG",
      },
    ],
  })
    .then((penjualanByKode) => {
      if (penjualanByKode === null)
        return res.status(404).json({
          error: "Penjualan tidak ditemukan",
        });
      const response = {
        penjualan: penjualanByKode.map((penjualan) => {
          return {
            id: penjualan.id,
            kode_penjualan: penjualan.kode_penjualan,
            nama_barang: penjualan.BRG.nama,
            harga: penjualan.BRG.harga_jual,
            jumlah: penjualan.jumlah,
            total: penjualan.total,
            tanggal: penjualan.tanggal,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Update jumlah penjualan per item
exports.updateOneItemPenjualan = (req, res, next) => {
  // Cari satu penjualan dengan id yang diinput
  Penjualan.findOne({
    where: {
      id: req.params.id,
    },
  }).then((penjualan) => {
    // Update jumlah stok barang
    // Cari satu barang dengan id barang dari find one penjualan
    Barang.findOne({
      where: {
        id: penjualan.id_barang,
      },
    })
      .then((barang) => {
        // Hitung stok barang yang harus ditambah dari jumlah penjualan
        let stokBarang = barang.stok + penjualan.jumlah - req.body.jumlah;

        // Update stoknya
        Barang.update(
          {
            stok: stokBarang,
          },
          {
            where: {
              id: penjualan.id_barang,
            },
          }
        )
          .then(() => {
            // Update penjualannya
            Penjualan.update(
              {
                jumlah: req.body.jumlah,
                total: req.body.total,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                // Catch update penjualan
                res.status(500).json({
                  error: err,
                });
              });
          })
          .catch((err) => {
            // Catch update barang
            res.status(500).json({
              error: err,
            });
          });
      })
      .catch((err) => {
        // Catch find one barang
        res.status(500).json({
          error: err,
        });
      });
  });
};

// Delete penjualan berdasarkan id
exports.deleteOnePenjualan = (req, res, next) => {
  // Cari satu penjualan dengan id yang diinput
  Penjualan.findOne({
    where: {
      id: req.params.id,
    },
  }).then((penjualan) => {
    // Update jumlah stok barang
    // Cari satu barang dengan id barang dari find one penjualan
    Barang.findOne({
      where: {
        id: penjualan.id_barang,
      },
    })
      .then((barang) => {
        // Hitung stok barang yang harus ditambah dari jumlah penjualan
        let stokBarang = barang.stok + penjualan.jumlah;

        // Update stoknya
        Barang.update(
          {
            stok: stokBarang,
          },
          {
            where: {
              id: penjualan.id_barang,
            },
          }
        )
          .then(() => {
            // Hapus penjualannya
            Penjualan.destroy({
              where: {
                id: req.params.id,
              },
            })
              .then((result) => {
                res.status(200).json({
                  message: "Penjualan berhasil dihapus",
                });
              })
              .catch((err) => {
                // Catch hapus barang
                res.status(500).json({
                  error: err,
                });
              });
          })
          .catch((err) => {
            // Catch update barang
            res.status(500).json({
              error: err,
            });
          });
      })
      .catch((err) => {
        // Catch find one barang
        res.status(500).json({
          error: err,
        });
      });
  });
};
