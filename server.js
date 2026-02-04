const db = require('./config/db.config');
const express = require('express'); // Express library ko project me import kiya..
const path = require('path');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./middleware/passport.local.middleware');
const flash = require('connect-flash');
const { setFlash } = require('./middleware/connectFlash.middleware');
const app = express();  // Express ka App object banaya..

const PORT = 3000;      // port number define kiya..
app.set('view engine', 'ejs');   // step-2

// call middleware
app.use(express.urlencoded({ extended: true }));

// middleware for static public & uploads
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "SneatProject",
    secret: "Sneat@30#994",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(flash());

// passport Initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(setFlash);

// Routes use karo
app.use('/', require('./routes/auth.route'));      // <-- Login ke liye (Sabse pehle check karega)
app.use('/', require('./routes/dashboard.route')); // <-- Dashboard ke liye

// server (PORT) start 🚀
app.listen(PORT, (error) => {
   if (error) {
    console.log("Sneat - Server does not statred", error);
    return false;
   }
   else {
    console.log(`Sneat - Server started at port : ${PORT}`);
   }
});