const express = require("express");
const { createAddress, getAddress } = require("../controller/address");
const { userMiddleware } = require("../validators/roleValidation");
const { requireSignin } = require("../validators/validateToken");
const router = express.Router();

router.post("/user/address/create", requireSignin, userMiddleware, createAddress)
router.get("/user/address/get", requireSignin, userMiddleware, getAddress)

module.exports = router;
