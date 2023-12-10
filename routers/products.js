const express = require("express");
const router = express.Router();

const {
  allProducts,
  productById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/products");

router.get("/product-by-id", productById);
router.get("/all-products", allProducts);

router.post("/create-product", createProduct);

router.put("/update-product", updateProduct);

router.delete("/delete-product", deleteProduct);

module.exports = router;
