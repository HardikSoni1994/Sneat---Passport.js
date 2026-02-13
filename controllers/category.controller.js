const Category = require ('../models/category.model');
const subCategory = require('../models/subCategory.model');
const extraCategory = require('../models/extraCategory.model');
const product = require('../models/product.model');
const fs = require('fs');
const path = require('path');

// Add Category Page
const addCategoryPage = (req, res) => {
    return res.render('category/addCategory', {page: 'addCategory'});
}

// View Category Page
const viewCategoryPage = async (req, res) => {
    try {
        const categoryData = await Category.find({});

        return res.render('category/viewCategory', { page: 'viewCategory', categoryData: categoryData });

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// insert Category 
// 3. Insert Category (Data Save Logic)
const insertCategory = async (req, res) => {
    try {
        // console.log("Form Data:", req.body);
        // console.log("Image Data:", req.file);

        const { category_name } = req.body;
        
        // Database me create kar rahe hain
        await Category.create({
            category_name: category_name,
            category_image: req.file ? req.file.filename : null,
            status: true
        });

        req.flash('success', `${category_name} Category Added Successfully !!`);
        return res.redirect('/category/viewCategory');
        
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong !");
        return res.redirect('/category/addCategory');
    }
}

const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;

        const data = await Category.findById(id);

        await Category.findByIdAndDelete(id);
        await subCategory.deleteMany({ category_id: id });
        await extraCategory.deleteMany({ category_id: id });
        await product.deleteMany({ category_id: id });

        req.flash('success', `${data.category_name} Category Deleted Successfully !!`);
        return res.redirect('/category/viewCategory');

        if (data) {
            const imagePath = path.join('public/uploads/categories', data.category_image);

            fs.unlink(imagePath, (error) => {
                if (error) {
                    console.log("Image Deletion failed or file missing..", error);
                } else {
                    console.log("Image Deleted Successfully! 🗑️");
                }
            });
        } else {
            console.log("Category not found");
            req.flash('error', "Category not found!");
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

const editCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Category.findById(id);

        return res.render('category/editCategory', { data: data, page: 'viewCategory'});
    } catch (error) {
        console.log(error);
        return res.redirect('back');        
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, category_name } = req.body;
        
        const oldData = await Category.findById(id);

        if (!oldData) {
            console.log("Record not found");
            return res.redirect('back');
        }

        let image = oldData.category_image;
        
        if (req.file) {
            image = req.file.filename;

            const oldImagePath = path.join('public/uploads/categories', oldData.category_image);

            fs.unlink(oldImagePath, (error) => {
                if (error) {
                    console.log("Old Image Deletion failed..", error);
                } else {
                    console.log("Old Image Deleted Successfully! 🗑️");
                }
            });
        }

        // Database Update
        await Category.findByIdAndUpdate(id, {
            category_name: category_name,
            category_image: image
        });
        req.flash('success', `${category_name} Category Updated Successfully !!`);
        return res.redirect('/category/viewCategory');
        
    } catch (error) {
        console.log(error);
        return res.redirect('/category/viewCategory');
    }
}

module.exports = { addCategoryPage, viewCategoryPage, insertCategory, deleteCategory, editCategory, updateCategory};