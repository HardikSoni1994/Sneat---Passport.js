const Category = require('../models/category.model');
const subCategory = require('../models/subCategory.model');
const extraCategory = require('../models/extraCategory.model');
const product = require('../models/product.model');
const fs = require('fs');
const path = require('path');

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
            image = req.file.path
            console.log("Image Path:", image);
        }

        await extraCategory.create({
            category_id: category_id,
            subCategory_id: subCategory_id,
            extraCategory_name: extraCategory_name,
            extraCategory_image: req.file.filename
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
        await product.deleteMany({ extraCategory_id: id });
        
        req.flash('success', `${oldData.extraCategory_name} Deleted Successfully!`);
        return res.redirect('/extraCategory/viewExtraCategory');
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

        let updateData = {
            category_id: category_id,
            subCategory_id: subCategory_id,
            extraCategory_name: extraCategory_name
        };

        if (req.file) {
            const oldData = await extraCategory.findById(id);

            if (oldData && oldData.extraCategory_image) {
                const oldImagePath = path.join(__dirname, '../public/uploads/extraCategories', oldData.extraCategory_image);

                // Yahan asynchronous fs.unlink use kiya hai, bina server block kiye
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.log("Old image delete karne me error:", err);
                    } else {
                        console.log("Old image deleted successfully.");
                    }
                });
            }

            updateData.extraCategory_image = req.file.filename;
        }

        await extraCategory.findByIdAndUpdate(id, updateData);

        req.flash('success', 'Extra Category updated successfully!');
        return res.redirect('/extraCategory/viewExtraCategory');

    } catch (error) {
        console.log("Update Error:", error);
        req.flash('error', 'Something went wrong during update');
        return res.redirect('/extraCategory/viewExtraCategory');
    }
};

module.exports = { addExtraCategoryPage, insertExtraCategory, viewExtraCategoryPage, deleteExtraCategory, editExtraCategory, updateExtraCategory };