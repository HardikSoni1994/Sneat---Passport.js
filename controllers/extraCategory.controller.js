const Category = require('../models/category.model');
const subCategory = require('../models/subCategory.model');
const extraCategory = require('../models/extraCategory.model');

// Add Extra Category page
const addExtraCategoryPage = async(req, res) => {
    try {
        const categories = await Category.find({});
        const subCategories = await subCategory.find({});

        return res.render('extraCategory/addExtraCategory', { categories: categories, subCategories: subCategories, page: 'addExtraCategory'});
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// Insert Logic
const insertExtraCategory = async (req, res) => {
    try {
        const { category_id, subCategory_id, extraCategory_name} = req.body;

        await extraCategory.create({
            category_id: category_id,
            subCategory_id: subCategory_id,
            extraCategory_name: extraCategory_name
        });

        req.flash('success', "Extra Category Added Successfully!");
        return res.redirect('/extraCategory/addExtraCategory');
    } catch (error) {
        console.log(error);
        req.flash('error', "Extra category insertion failed.!");
        return res.redirect('back');
    }
}

module.exports = { addExtraCategoryPage, insertExtraCategory};