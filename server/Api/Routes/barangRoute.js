const express = require("express");
const router = express.Router();

// Middleware
const checkAuth = require("../Middleware/checkAuth");

// Controllers
const barangController = require("../Controllers/barangController");

// Routes
// /:id(\\d+)/ adalah regex supaya bisa menggunakan slug /barang/kategori
// Sehingga jika memasukkan slug /barang/kategori, yang tereksekusi adalah routes kategori
// Bukan routes barang/:id
router.post("/", checkAuth.adminAuth, barangController.createBarang);
router.get("/", checkAuth.adminAuth, barangController.getAllBarang);
router.get("/:id(\\d+)/", checkAuth.adminAuth, barangController.getBarangById);
router.get(
  "/barcode/:barcode(\\d+)/",
  checkAuth.adminAuth,
  barangController.getBarangByBarcode
);
router.patch("/:id(\\d+)/", checkAuth.adminAuth, barangController.updateBarang);
router.delete(
  "/:id(\\d+)/",
  checkAuth.adminAuth,
  barangController.deleteBarang
);

router.post(
  "/kategori/",
  checkAuth.adminAuth,
  barangController.createKategoriBarang
);
router.get(
  "/kategori/",
  checkAuth.adminAuth,
  barangController.getAllKategoriBarang
);
router.get(
  "/kategori/:id",
  checkAuth.adminAuth,
  barangController.getKategoriBarangById
);
router.patch(
  "/kategori/:id",
  checkAuth.adminAuth,
  barangController.updateKategoriBarang
);
router.delete(
  "/kategori/:id",
  checkAuth.adminAuth,
  barangController.deleteKategoriBarang
);

module.exports = router;
