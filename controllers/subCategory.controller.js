const Category = require('../models/category.model');
const subCategory = require('../models/subCategory.model');
const extraCategory = require('../models/extraCategory.model');
const product = require('../models/product.model');
const fs = require('fs');
const path = require('path');

// Add Subcategory Page
const addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find({});

        const subCategoryOptions = ["Smart Phones", "Tablets", "Powerbanks", "Laptops", "Watches", "Smart Watches", "Televisions", "Men's T-Shirts", "Women's T-shirts","Men's Shirts", "Women's Shirts", "Men's Jeans", "Women's Jeans", "Footware", "Furniture", "Kitchen", "Hair Care", "Body & skin Care"];

    return res.render('subCategory/addSubCategory', { categories: categories, subCategoryOptions: subCategoryOptions, page: 'addSubCategory' });
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong !");
        return res.redirect('/subCategory/addSubCategory');
    }
}

// View Subcatergory Page
const viewSubCategoryPage = async (req, res) => {
    try {
        const subCategories = await subCategory.find({}).populate('category_id');

        return res.render('subcategory/viewSubCategory', {subCategories: subCategories, page: 'viewSubCategory'});
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong !");
        return res.redirect('/subCategory/addSubCategory');
    }
}

// insert Subcategory
const insertSubCategory = async (req, res) => {
    try {
        let image = "";
        if (req.file) {
            image = req.file.filename;
        }
        const {category_id, subCategory_name} = req.body;

        await subCategory.create({
            category_id: category_id,
            subCategory_name: subCategory_name,
            subCategory_image: image
        });
        req.flash('success', `${subCategory_name} Added Successfully!`);
        return res.redirect('/subCategory/viewSubCategory');
        
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong !");
        return res.redirect('/subcategory/addSubCategory');
    }
}

// 4. Delete SubCategory
const deleteSubCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const singleSubCat = await subCategory.findById(id);

        await subCategory.findByIdAndDelete(id);
        await extraCategory.deleteMany({ subCategory_id: id });
        await product.deleteMany({ subCategory_id: id });

        req.flash('success', `${singleSubCat.subCategory_name} Deleted Successfully!`);
        return res.redirect('/subCategory/viewSubCategory');

    } catch (error) {
        console.log(error);
        req.flash('error', "Error deleting SubCategory");
        return res.redirect('back');
    }
}

// Edit SubCategory
const editSubCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // Jisko edit karna hai wo data laye
        const singleSubCategory = await subCategory.findById(id);

        // Dropdown ke liye saari categories laye
        const categories = await Category.find({});

        return res.render('subCategory/editSubCategory', {
            singleSubCategory: singleSubCategory,
            categories: categories,
            page: 'viewSubCategory'
        });

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// 6. Update Data
const updateSubCategory = async (req, res) => {
    try {
        const { id, category_id, subCategory_name } = req.body;

        if (req.file) {
            let image = req.file.filename;

            await subCategory.findByIdAndUpdate(id, {
            category_id: category_id,
            subCategory_name: subCategory_name,
            subCategory_image: req.file.filename
        });
        } else {
            await subCategory.findByIdAndUpdate(id, {
                category_id: category_id,
                subCategory_name: subCategory_name,
            });
        }
        req.flash('success', `${subCategory_name} Updated Successfully!`);
        return res.redirect('/subCategory/viewSubCategory');

    } catch (error) {
        console.log(error);
        req.flash('error', "Error Updating Data");
        return res.redirect('/subCategory/viewSubCategory');
    }
}

module.exports = {addSubCategoryPage, viewSubCategoryPage, insertSubCategory, deleteSubCategory, editSubCategory, updateSubCategory};