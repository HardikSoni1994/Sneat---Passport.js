const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin.model'); // model import

// 1. Define Strategy
passport.use(new localStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        console.log("Email:", email);
        console.log("Password:", password);
        
        
        const admin = await Admin.findOne({email: email});

        if (!admin) {
            console.log("Error: Admin not Found.");
            return done(null, false);
        }
        if (admin.password != password) {
            console.log("Error: Password is incorrect.");
            return done(null, false);
        }
        return done(null, admin);
    } catch (error) {
        console.log("Error in Passport Strategy", error);
        return done(error);
    }
}));

// serialize 
passport.serializeUser((admin, done) => {
    return done(null, admin.id);
});

// Deserialize
passport.deserializeUser(async(admin, done) => {
    try {
        const adminData = await Admin.findById(admin);
        if (!admin) {
            return done(null, false);
        }
        return done(null, adminData);
    } catch (error) {
        return done(error);
    }
});

// check User is login or not
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;