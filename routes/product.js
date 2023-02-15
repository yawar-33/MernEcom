const express = require("express");
const { addProduct, getProducts, getProductById, deleteProduct, addReview, findProductByCategoryId } = require("../controller/product");
const { requireSignin } = require("../validators/validateToken");

const router = express.Router();

router.post('/product/save', requireSignin, addProduct)
router.get("/product/get", requireSignin, getProducts);
router.get("/product/:productId", getProductById);

router.post("/product/delete", requireSignin, deleteProduct);
router.post("/product/review", requireSignin, addReview)

router.get("/product/findProductByCategoryId/:categoryId", findProductByCategoryId)
module.exports = router;