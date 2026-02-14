const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const subCategory = require('../models/subCategory.model');
const extraCategory = require('../models/extraCategory.model');
const product = require('../models/product.model');
const fs = require('fs');
const path = require('path');


// dashboardPage step-6
const dashboardPage = async (req, res) => {
    try {
        // 1. Data base se sabki total ginti nikalo
        const categoryCount = await Category.countDocuments();
        const subCategoryCount = await subCategory.countDocuments();
        const extraCategoryCount = await extraCategory.countDocuments();
        const productCount = await product.countDocuments();

        const recentProducts = await product.find({}).sort({ _id: -1 }).limit(5);

        res.render('dashboard/index', { 
            page: 'dashboard',
            categoryCount: categoryCount,
            subCategoryCount: subCategoryCount,
            extraCategoryCount: extraCategoryCount,
            productCount: productCount,
            recentProducts: recentProducts
        });
        
    } catch (error) {
        console.log("Dashboard Error:", error);
        res.render('dashboard/index', { 
            page: 'dashboard',
            categoryCount: 0, 
            subCategoryCount: 0, 
            extraCategoryCount: 0, 
            productCount: 0,
            recentProducts: [] 
        }); 
    }
};

// Admin page
const addAdminPage = (req, res) => {
    res.render('dashboard/addAdmin', { page: 'addAdmin'});
};

// Admin Controller Logic
// Insert Admin Data
const insertAdmin = async (req, res) => {
    try {
        let image = "";
        if (req.file) {
            image = req.file.filename;
        }

        const { name, email, password, city, phone } = req.body;

        await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            phone: req.body.phone,
            image: req.file ? req.file.filename : ''
        });

        console.log("Admin Data Added Successfully! ✅");
        req.flash('success', 'Admin added successfully!');
        return res.redirect('/view-admin'); 

    } catch (error) {
        console.log("Error inserting data: ", error);
    }
};

// View Admin
const viewAdminPage = async (req, res) => {
    try {
        const data = await Admin.find({}); 
        res.render('dashboard/viewAdmin', { data, page: 'viewAdmin' });
    } catch (error) {
        console.log(error);
    }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Admin.findById(id);

        if (data) {

            const image = path.join('public/uploads/admins', data.image);

            fs.unlink(image, (error) => {
                if (error) {
                    console.log("Image Deletion failed..", error);
                } else {
                    console.log("Image Deleted Successfully! 🗑️");
                }
            });

            await Admin.findByIdAndDelete(id);
            
            console.log("Admin Record Deleted Successfully! ✅");
            req.flash('success', 'Admin deleted successfully!');
            res.redirect('/view-admin');
        } else {
            console.log("Admin record nahi mila");
            req.flash('error', 'Admin not found!');
            res.redirect('/view-admin');
        }

    } catch (error) {
        console.log("Delete error:", error);
    }
};

// Edit Admin
const editAdminPage = async (req, res) => {
    try {
        const data = await Admin.findById(req.params.id);
        
        res.render('dashboard/editAdmin', { data, page: 'viewAdmin' }); 
        
    } catch (error) {
        console.log(error);
    }
};

// Update Admin
const updateAdmin = async (req, res) => {
    try {
        const { id, name, email, password, city, phone } = req.body;

        const oldData = await Admin.findById(id);

        if (!oldData) {
            console.log("Record not found");
            req.flash('error', 'Admin not found!');
            return res.redirect('/view-admin');
        }

        let image = oldData.image;

        if (req.file) {
            image = req.file.filename;

            const oldImage = path.join('public/uploads/admins', oldData.image);

            fs.unlink(oldImage, (error) => {
                if (error) {
                    console.log("Old Image Deletion failed..", error);
                } else {
                    console.log("Old Image Deleted Successfully! 🗑️");
                }
            });
        }

        // Database Update
        await Admin.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password,
            city: city,
            phone: phone,
            image: image
        });

        console.log("Admin Data Updated Successfully! ✅");
        req.flash('success', 'Admin updated successfully!');
        res.redirect('/view-admin');

    } catch (error) {
        console.log("Update error:", error);
    }
};

// USER Controller Logic START 
const addUserPage = (req, res) => {
    res.render('dashboard/addUser', {page: 'addUser'});
};

// Insert User Data
const insertUser = async (req, res) => {
    try {
        let image = "";
        if (req.file) {
            image = req.file.filename;
        }
        const { username, email, password, phone, city } = req.body;
        await User.create({
            username: username,
            email: email,
            password: password,
            phone: phone,
            city: city,
            user_image: image
        });

        console.log("User Added Successfully! ✅");
        req.flash('success', 'User added successfully!');
        res.redirect('/view-user'); 

    } catch (error) {
        console.log(error);
    }
};

// View User Page
const viewUserPage = async (req, res) => {
    try {
        const data = await User.find({});
        res.render('dashboard/viewUser', { data, page: 'viewUser' });
    } catch (error) {
        console.log(error);
    }
};

// Delete User Function
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await User.findById(id);

        if (data) {

            const image = path.join('public/uploads/users', data.user_image);
            
            fs.unlink(image, (err) => {
                if (err) {
                    console.log("User Image delete error:", err);
                }    
                else {
                    console.log("User Image Deleted! 🗑️");
                }
            });

            // 3. Data Delete from Database
            await User.findByIdAndDelete(id);
            
            console.log("User Deleted Successfully! ✅");
            req.flash('success', 'User deleted successfully!');
            res.redirect('/view-user');
        } else {
            console.log("User not found");
            req.flash('error', 'User not found!');
            res.redirect('/view-user');
        }

    } catch (error) {
        console.log(error);
    }
};

// Edit User Page
const editUserPage = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id);
        res.render('dashboard/editUser', { data, page: 'viewUse' });
    } catch (error) {
        console.log(error);
    }
};

// Update User Data
const updateUser = async (req, res) => {
    try {
        const { id, username, email, password, phone, city } = req.body;

        const oldData = await User.findById(id);

        let image = oldData.user_image; 

        if (req.file) {
            image = req.file.filename;

            const oldImage = path.join('public/uploads/users', oldData.user_image);
            
            fs.unlink(oldImage, (err) => {
                if (err) console.log("Old user Image Deletion failed..:", err);
                else console.log("Old User Image Deleted! 🗑️");
            });
        }

        // 3. Database Update
        await User.findByIdAndUpdate(id, {
            username: username,
            email: email,
            password: password,
            phone: phone,
            city: city,
            user_image: image
        });

        console.log("User Updated Successfully! ✅");
        req.flash('success', 'User updated successfully!');
        res.redirect('/view-user');

    } catch (error) {
        console.log(error);
    }
};

 // 1. ChangePassword Logic
    const changePasswordPage = (req, res) => {
    return res.render('dashboard/changePassword', { page: 'change-password' });
}

// 2. Password Change Logic (Main Logic)
const changePassword = async (req, res) => {
    try {
        const id = req.user._id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        
        const dataBaseAdmin = await Admin.findById(id);

        if (dataBaseAdmin.password == currentPassword) {
            console.log("Password Matched! ✅");
            if (currentPassword != newPassword) {

                if (newPassword == confirmPassword) {

                    await Admin.findByIdAndUpdate(dataBaseAdmin._id, { password: newPassword });
                    
                    console.log("Password Changed Successfully! 🥳");
                    req.flash('success', 'Password changed successfully!');
                    return res.redirect('/dashboard');

                } else {
                    console.log("New Password and Confirm Password do not match! ❌");
                    req.flash('error', 'New Password and Confirm Password do not match!');
                    return res.redirect('/change-password');
                }

            } else {
                console.log("New Password cannot be same as Old Password! ⚠️");
                req.flash('error', 'New Password cannot be same as Old Password!');
                return res.redirect('/change-password');
            };

        } else {
            console.log("Current Password is Wrong! ❌");
            req.flash('error', 'Current Password is Wrong!');
            return res.redirect('/change-password');
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/change-password');
    }
};

// My Profile Page
const myProfilePage = async (req, res) => {
    try {
        const data = req.user;

        res.render('dashboard/myProfile', { 
            data: data, 
            page: 'my-profile'
        });

    } catch (error) {
        console.log("My Profile Error:", error);
        res.redirect('back');
    }
};

// Update My Profile Logic
const updateMyProfile = async (req, res) => {
    try {
        const { id, name, email, password, city, phone } = req.body;

        const oldData = await Admin.findById(id);

        if (!oldData) {
            console.log("Admin profile not found");
            return res.redirect('/my-profile');
        }

        let image = oldData.image;

        if (req.file) {
            image = req.file.filename;
            const oldImagePath = path.join('public/uploads/admins', oldData.image);

            fs.unlink(oldImagePath, (error) => {
                if (error) {
                    console.log("Old Profile Image Deletion failed..", error);
                } else {
                    console.log("Old Profile Image Deleted Successfully! 🗑️");
                }
            });
        }

        // 2. Database Update
        await Admin.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password,
            city: city,
            phone: phone,
            image: image
        });

        console.log("Profile Updated Successfully! ✅");

        if (req.user) {
            req.user.image = image;
            req.user.name = name;
        }

        req.flash('success', "Profile Updated Successfully !!");
        return res.redirect('/dashboard');
        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// Admin & User data exports
module.exports = {dashboardPage, addAdminPage, insertAdmin, viewAdminPage, deleteAdmin, editAdminPage, updateAdmin, addUserPage, insertUser, viewUserPage, deleteUser, editUserPage, updateUser, changePasswordPage, changePassword, myProfilePage, updateMyProfile};  // step-7

