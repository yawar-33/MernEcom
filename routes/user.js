const express = require("express");
const { signup, signin } = require("../controller/user/user");
const { isSignupRequestValidated, isSignInRequestValidated } = require("../validators/userValidations");
const router = express.Router();


router.post('/user/signup', isSignupRequestValidated, signup)
router.post('/user/signin', isSignInRequestValidated, signin)
module.exports = router;