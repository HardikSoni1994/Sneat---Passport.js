const express = require('express');
const router = express.Router();
const passport = require('passport');

// Auth Controller import
const authController = require('../controllers/auth.controller');

const upload = require('../middleware/multer.middleware');

// Login Routes
router.get('/', authController.loginPage);        // Login Page
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: 'Invalid email or password!'
}),
(req, res) => {
    console.log("Login Successfully via Passport! 🚀");
    req.flash('success', 'Welcome back!');
    res.redirect('/dashboard');
}); // Login Action

// Logout Routes
router.get('/logout', authController.logout);

// Register Routes
router.get('/register', authController.registerPage); 
router.post('/register', upload.single('image'), authController.registerUser);

// Forget Password Routes
router.get('/forget-password', authController.forgetPasswordPage);

// OTP sending Routes
router.post('/send-otp', authController.sendOtp);

// OTP verify Routes
router.post('/verify-otp', authController.verifyOtp);

// Password Update Route
router.post('/update-password', authController.updatePassword);

module.exports = router;