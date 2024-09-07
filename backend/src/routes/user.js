const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')

router.get('/', controller.testApi);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/validate-otp', controller.validateOtp);

module.exports = router;