const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const fs = require("fs");

const User = require("../Models/userModel");

// Membuat user baru
exports.createUser = (req, res, next) => {
  hashedPassword = bcrypt.hashSync(req.body.password, 10);
  let foto = req.file ? req.file.filename : "default.jpg";
  User.findOrCreate({
    where: {
      [Op.or]: [
        {
          username: req.body.username,
        },
        {
          surel: req.body.surel,
        },
      ],
    },
    defaults: {
      username: req.body.username,
      nama: req.body.nama,
      surel: req.body.surel,
      password: hashedPassword,
      level: req.body.level,
      foto: foto,
      createdAt: new Date(),
    },
  })
    .spread((dataUser, isCreated) => {
      if (isCreated === false) {
        // Hapus file yang sudah diupload
        fs.unlink(req.file.path, (err) => {
          res.status(409).json({
            error: "Username atau email sudah terdaftar",
          });
        });
      } else {
        res.status(200).json({
          message: "Berhasil membuat user baru",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Mengambil semua users
exports.getAllUsers = (req, res, next) => {
  User.findAll({
    attributes: [
      "id",
      "username",
      "surel",
      "nama",
      "level",
      "foto",
      "createdAt",
    ],
  })
    .then((users) => {
      if (users === null)
        return res.status(404).json({
          error: "Belum ada data user",
        });
      const response = {
        count: users.length,
        keterangan: "Level 0 untuk role Admin, level 1 untuk role Kasir",
        users: users.map((user) => {
          return {
            id: user.id,
            username: user.username,
            surel: user.surel,
            nama: user.nama,
            level: user.level,
            foto: user.foto,
            createdAt: user.createdAt,
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

// Mengambil user berdasarkan id
exports.getUserById = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user === null)
        return res.status(404).json({
          error: "User tidak ditemukan",
        });
      const response = {
        keterangan: "Level 0 untuk role Admin, level 1 untuk role Kasir",
        users: {
          id: user.id,
          username: user.username,
          surel: user.surel,
          nama: user.nama,
          level: user.level,
          foto: user.foto,
          createdAt: user.createdAt,
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Update user
exports.updateUser = (req, res, next) => {
  if (req.body.password)
    req.body.password = bcrypt.hashSync(req.body.password, 10);

  if (req.file) req.body.foto = req.file.filename;

  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "User berhasil diupdate",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Delete user
exports.deleteUser = (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "User berhasil dihapus",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
