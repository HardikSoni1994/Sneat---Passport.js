const Category = require('../models/category.model');
const subCategory = require('../models/subCategory.model');

// Add Subcategory Page
const addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find({});

    return res.render('subCategory/addSubCategory', { categories: categories, page: 'addSubCategory' });
    } catch (error) {
        console.log(error);
        return res.redirect('back');  
    }
}

// View Subcatergory Page
const viewSubCategoryPage = async (req, res) => {
    try {
        const subCategories = await subCategory.find({}).populate('category_id');

        return res.render('subcategory/viewSubCategory', {subCategories: subCategories, page: 'viewSubCategory'});
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// insert Subcategory
const insertSubCategory = async (req, res) => {
    try {
        const {category_id, subCategory_name} = req.body;

        await subCategory.create({
            category_id: category_id,
            subCategory_name: subCategory_name,
        });
        req.flash('success', "SubCategory Added Successfully!");
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

        await subCategory.findByIdAndDelete(id);

        req.flash('success', "SubCategory Deleted Successfully!");
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

        await subCategory.findByIdAndUpdate(id, {
            category_id: category_id,
            subCategory_name: subCategory_name
        });

        req.flash('success', "SubCategory Updated Successfully!");
        return res.redirect('/subCategory/viewSubCategory');

    } catch (error) {
        console.log(error);
        req.flash('error', "Error Updating Data");
        return res.redirect('back');
    }
}

module.exports = {addSubCategoryPage, viewSubCategoryPage, insertSubCategory, deleteSubCategory, editSubCategory, updateSubCategory};