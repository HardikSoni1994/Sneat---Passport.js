const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router(); // create router variable - step-4

// controllers import step-5
const authController = require('../controllers/auth.controller');
const dashboardController = require('../controllers/dashboard.controller');

// Auth routes step-6
router.get('/', authController.loginPage);
router.get('/signup', authController.signupPage);


// Dashboard route
router.get('/dashboard', dashboardController.dashboardPage);

module.exports = router;    // step-7