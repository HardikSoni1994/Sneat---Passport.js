const mongoose = require('mongoose');

const adminSchema = mongoose.Schema ({ 
        name: {
                type: String,
                required: true 
                },
        email: { 
                type: String,
                required: true
                },
        password: { 
                type: String, 
                required: true
                }, 
        city: { 
                type: String,
                required: false
                }, 
        phone: {
                type: String,
                require: false
                },
        image: { 
                type: String,
                required: false
                },
        otp: {
                type: String,
                default: null
        },
        otpExpiration: {
                type: Date,
                default: null
        }
 });

const Admin = mongoose.model('Admin', adminSchema, "Admin");

module.exports = Admin;