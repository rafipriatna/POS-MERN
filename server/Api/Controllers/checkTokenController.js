const User = require("../Models/userModel");

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      const response = {
        id: user.id,
        username: user.username,
        surel: user.surel,
        nama: user.nama,
        level: user.level,
        foto: user.foto,
        last_login: user.last_login,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
