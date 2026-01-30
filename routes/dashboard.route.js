const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const upload = require('../middleware/multer.middleware');
// Controller import kiya
const dashboardController = require('../controllers/dashboard.controller');


// const isLogin = (req, res, next) => {
//     if(req.cookies.adminData) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// };


// Admin route
router.get('/', dashboardController.dashboardPage);
router.get('/dashboard', passport.checkAuthentication, dashboardController.dashboardPage);
router.get('/addAdmin', passport.checkAuthentication, dashboardController.addAdminPage);
router.post('/insert-admin', upload.single('avatar'), dashboardController.insertAdmin);
router.get('/view-admin', passport.checkAuthentication, dashboardController.viewAdminPage);
router.get('/delete-admin/:id', dashboardController.deleteAdmin);
router.get('/edit-admin/:id', passport.checkAuthentication, dashboardController.editAdminPage);
router.post('/update-admin', upload.single('avatar'), dashboardController.updateAdmin);

// User route
router.get('/addUser', passport.checkAuthentication, dashboardController.addUserPage);
router.post('/insert-user', upload.single('avatar'), dashboardController.insertUser);
router.get('/view-user', passport.checkAuthentication, dashboardController.viewUserPage);
router.get('/delete-user/:id', dashboardController.deleteUser);
router.get('/edit-user/:id', passport.checkAuthentication, dashboardController.editUserPage);
router.post('/update-user', upload.single('avatar'), dashboardController.updateUser);

// Change Password Routes (Protected by isLogin)
router.get('/change-password', passport.checkAuthentication, dashboardController.changePasswordPage);
router.post('/change-password', passport.checkAuthentication, dashboardController.changePassword);

// my Profile Routes
router.get('/my-profile', passport.checkAuthentication, dashboardController.myProfilePage);
router.post('/update-my-profile', upload.single('image'), dashboardController.updateMyProfile); 

module.exports = router;