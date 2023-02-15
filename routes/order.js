const express = require("express");
const { addOrder, getOrderList, getOrderDetailById, updateOrderStatus } = require("../controller/order");
const { userMiddleware, adminMiddleware } = require("../validators/roleValidation");
const { requireSignin } = require("../validators/validateToken");
const router = express.Router();

router.post("/order/create", requireSignin, userMiddleware, addOrder)
router.get("/order/get", requireSignin, userMiddleware, getOrderList)
router.get("/order/getorderdetailbyid/:orderId", requireSignin, userMiddleware, getOrderDetailById)

// for admin only 
router.post("/order/updateorderstatus", requireSignin, adminMiddleware, updateOrderStatus)

module.exports = router;
