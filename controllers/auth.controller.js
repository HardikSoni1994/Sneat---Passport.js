const Admin = require('../models/admin.model'); // model import
const nodemailer = require('nodemailer');

let savedOTP = null;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soni.hardik994@gmail.com',
        pass: 'jpvsdmzgfgcqkvuk'
    }
});


// 1. Login Page
const loginPage = (req, res) => {
    if(req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login');
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            console.log("Email not found!");
            req.flash('error', 'Email not found!');
            return res.redirect('/');
        }

        if (admin.password != password) {
            console.log("Password wrong!");
            req.flash('error', 'Wrong password!');
            return res.redirect('/');
        } 

        console.log("Login Success!");
        req.flash('success', 'Login successful!');
        return res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
};

// Logout Function
const logout = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/');
    })
};

// 1. Register Page
const registerPage = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("Admin already logged in. redirecting to Dashboard.");
        return res.redirect('/dashboard');
    }
    res.render('auth/register');
}

// 2. Register User Logic
// Register ka Logic (Data Save karna)
const registerUser = async (req, res) => {
    try {
        console.log("Register Data Aaya:", req.body); 

        // 1. Check existing email
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) {
            console.log("Email already exists");
            req.flash('error', 'Email already exists!');
            return res.redirect('/register');
        }

        // 2. Create Admin (City/Phone ki chinta mat karo)
        const newAdmin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.file ? req.file.path : '' // Agar photo upload hui to thik, varna khali
        });

        console.log("Admin Registered Successfully! ✅");
        req.flash('success', 'Registration successful! Please login.');
        
        // Success -> Login Page
        return res.redirect('/'); 

    } catch (error) {
        console.log("Error in Registration:", error);
        return res.redirect('/register');
    }
}

const forgetPasswordPage = (req, res) => {
   if (req.isAuthenticated()) {
    console.log("Admin already logged in. cannot access forget password Page");
    return res.redirect('/dashboard');
   }
    res.render('auth/forgetPassword'); 
}

// Forget Password Process through Email
const sendOtp = async (req, res) => {
    try {
        const email = req.body.email;
        console.log("OTP Process Started for:", email);

        // 1. Email Database me Check karo
        const adminData = await Admin.findOne({ email: email });

        if (!adminData) {
            console.log("Email not found in Database");
            req.flash('error', 'Email not found!');
            return res.redirect('/forget-password');
        }

        // 2. OTP Generate karo (6 Digit Random)
        const otp = Math.floor(100000 + Math.random() * 900000);
        savedOTP = otp;

        // 3. send mail
        const mailInfo = {
            from: ' "Sneat (No-Reply)" <soni.hardik994@gmail.com>',
            to: email, // form me jo email hogi voh yaha locate ho jayegi
            replyTo: 'no-reply@sneat.com',
            subject: 'Reset Password OTP 🔐',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f9; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #696cff; margin: 0; font-size: 28px; font-weight: 700;">Sneat Admin</h2>
                </div>

                <h3 style="color: #566a7f; margin-top: 0;">Password Reset Request</h3>
                <p style="color: #697a8d; font-size: 16px; line-height: 1.5;">Hello <b>${adminData.name}</b>,</p>
                <p style="color: #697a8d; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Use the OTP below to proceed:</p>

                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; background-color: #e7e7ff; color: #696cff; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 8px; letter-spacing: 5px;">
                        ${otp}
                    </span>
                </div>
                <p style="color: #697a8d; font-size: 14px;">Do not share this with anyone.</p>
                <p style="color: #697a8d; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
                <div>
                    <p style="color: red;">Note: This is an auto-generated email. Please do not reply.</p>
                <hr style="border: none; border-top: 1px solid #eceef1; margin: 20px 0;">
                
                <p style="color: #a1acb8; font-size: 12px; text-align: center;">
                    &copy; 2026 Sneat Admin Panel. All rights reserved.<br>
                    This is an automated system message.
                </p>
            </div>
        </div>
            `
        };

        transporter.sendMail(mailInfo, (error, info) => {
            if (error) {
                console.log("Mail Error:", error);
            } else {
                console.log("Mail Sent Successfully! 🚀");
                
                // 4. Verify Page par bhej do
                res.render('dashboard/verifyOtp', { email: email });
            }
        });

    } catch (error) {
        console.log(error);
    }
};

const verifyOtp = async (req, res) => {
    try {
        const userEnteredOtp = req.body.otp;
        const email = req.body.email; // Hidden input se email le rahe hain

        if (userEnteredOtp == savedOTP) {
            
            console.log("OTP Match! ✅");
            req.flash('success', 'OTP verified successfully!');
            res.render('auth/resetPassword', { email: email }); 
            
        } else {
            console.log("Wrong OTP! ❌");
            req.flash('error', 'Wrong OTP! Try again.');
            return res.redirect('/forget-password');
        }

    } catch (error) {
        console.log(error);
    }
}

// Final Step: Password Update Logic
const updatePassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // 1. Check karo ki password same hain ya nahi
        if (newPassword !== confirmPassword) {
            console.log("Passwords does not match.. ❌");
            req.flash('error', 'Passwords do not match!');
            return res.redirect('back');
        }

        // 2. Database me Password Update karo
        await Admin.findOneAndUpdate({ email: email }, { password: newPassword });

        console.log("Password Changed Successfully! 🎉");
        req.flash('success', 'Password changed successfully! Please login.');
        
        // 3. Wapis Login Page par bhej do
        res.redirect('/'); 

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports = { loginPage, loginAdmin, logout, registerPage, registerUser, forgetPasswordPage, sendOtp, verifyOtp, updatePassword };