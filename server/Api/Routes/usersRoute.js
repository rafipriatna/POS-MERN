const express = require('express')
const router = express.Router()
const multer = require('multer');

// Middleware
const checkAuth = require('../Middleware/checkAuth')

// Controllers
const usersController = require('../Controllers/userController')

// Upload function
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./Uploads/Images/Profiles/");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "images/jpeg" || file.mimetype === "images/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 1024 Bytes x 1024 = 1MB x 5 = 5MB
    },
    fileFilet: fileFilter,
  });

// Routes
router.post('/', upload.single("foto"), usersController.createUser)
router.get('/', checkAuth.adminAuth, usersController.getAllUsers)
router.get('/:id', checkAuth.adminAuth, usersController.getUserById)
router.patch('/:id', upload.single("foto"), checkAuth.adminAuth, usersController.updateUser)
router.delete('/:id', checkAuth.adminAuth, usersController.deleteUser)

module.exports = router