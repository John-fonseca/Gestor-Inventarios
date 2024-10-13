// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rutas para productos
router.get("/", productController.getProducts);
router.post("/", productController.addProduct);
router.put("/:index", productController.updateProduct);

module.exports = router;
