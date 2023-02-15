const express = require("express");
const { addItemToCart, getCartWithProductDetails, removeItemFromCart } = require("../controller/cart");
const { requireSignin } = require("../validators/validateToken");
const { userMiddleware } = require("../validators/roleValidation");
const router = express.Router();

router.post('/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

router.get("/cart/getcartitems", requireSignin, userMiddleware, getCartWithProductDetails);

router.post('/cart/removecartitems', requireSignin, userMiddleware, removeItemFromCart);

module.exports = router;
