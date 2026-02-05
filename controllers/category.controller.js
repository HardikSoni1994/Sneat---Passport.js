const Category = require ('../models/category.model');

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

        const { category_name, category_model, category_price } = req.body;
        
        // Database me create kar rahe hain
        await Category.create({
            category_name: category_name,
            category_model: category_model,
            category_price: category_price,
            category_image: req.file ? req.file.filename : null,
            status: true
        });

        req.flash('success', "Product Added Successfully !!");
        return res.redirect('/category/viewCategory');
        
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong !");
        return res.redirect('/category/addCategory');
    }
}

module.exports = { addCategoryPage, viewCategoryPage, insertCategory};