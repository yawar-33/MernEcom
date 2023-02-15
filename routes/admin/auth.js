const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/admin');
const { isSignupRequestValidated, isSignInRequestValidated } = require('../../validators/userValidations');
const router = express.Router();


router.post('/admin/signup', isSignupRequestValidated, signup);

router.post('/admin/signin', isSignInRequestValidated, signin);

router.post('/admin/signout', signout);

module.exports = router;