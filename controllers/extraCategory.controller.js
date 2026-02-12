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

        let image = '';
        if (req.file) {
            image = req.file.path.replace(/\\/g, '/').replace('public/', '');
            console.log("Image Path:", image);
        }

        await extraCategory.create({
            category_id: category_id,
            subCategory_id: subCategory_id,
            extraCategory_name: extraCategory_name,
            extraCategory_image: image
        });

        req.flash('success', "Extra Category Added Successfully!");
        return res.redirect('/extraCategory/viewExtraCategory');
    } catch (error) {
        console.log(error);
        req.flash('error', "Extra category insertion failed.!");
        return res.redirect('back');
    }
}

// View Extra Category Page
const viewExtraCategoryPage = async (req, res) => {
    try {

        const extraCategories = await extraCategory.find({})
            .populate('category_id')
            .populate('subCategory_id');

        console.log("Extra Categories:", extraCategories.map(item => ({
            name: item.extraCategory_name,
            image: item.extraCategory_image
        })));

        return res.render('extraCategory/viewExtraCategory', {
            extraCategories: extraCategories,
            page: 'viewExtraCategory'
        });

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
// Delete Logic
const deleteExtraCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const oldData = await extraCategory.findById(id);
        
        await extraCategory.findByIdAndDelete(id);
        
        req.flash('success', `${oldData.extraCategory_name} Deleted Successfully!`);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// Edit Logic
const editExtraCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const singleData = await extraCategory.findById(id);
        const categories = await Category.find({});
        const subCategories = await subCategory.find({});

        return res.render('extraCategory/editExtraCategory', {
            singleData: singleData,
            categories: categories,
            subCategories: subCategories,
            page: 'viewExtraCategory'
        });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// Update Logic
const updateExtraCategory = async (req, res) => {
    try {
        const { id, category_id, subCategory_id, extraCategory_name } = req.body;

        await extraCategory.findByIdAndUpdate(id, { category_id, subCategory_id, extraCategory_name });

        req.flash('success', `${extraCategory_name} Updated Successfully!`);
        return res.redirect('/extraCategory/viewExtraCategory');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports = { addExtraCategoryPage, insertExtraCategory, viewExtraCategoryPage, deleteExtraCategory, editExtraCategory, updateExtraCategory };