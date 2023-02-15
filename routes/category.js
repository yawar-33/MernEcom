const express = require("express");
const { addCategory, getCategories, deleteCategories } = require("../controller/category");
const { isValidCategory } = require("../validators/categoryValidation");
const { superAdminMiddleware } = require("../validators/roleValidation");
const { requireSignin } = require("../validators/validateToken");
const router = express.Router();

router.post('/category/save', requireSignin, isValidCategory, superAdminMiddleware, addCategory)
router.get("/category/get", getCategories);
router.post("/category/delete", requireSignin, deleteCategories);
module.exports = router;