const Category = require('../models/category.model');
const SubCategory = require('../models/subCategory.model');
const ExtraCategory = require('../models/extraCategory.model');
const Product = require('../models/product.model');

// Add Product Page
const addProductPage = async (req, res) => {
    try {
        const categories = await Category.find({ });
        const subCategories = await SubCategory.find({ });
        const extraCategories = await ExtraCategory.find({ });

        return res.render('product/addProduct', {
            categories: categories,
            subCategories: subCategories,
            extraCategories: extraCategories,
            page:'addProduct'
        });

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// View Product Page
const viewProductPage = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category_id')
            .populate('subCategory_id')
            .populate('extraCategory_id');

        return res.render('product/viewProduct', {
            products: products,
            page: 'viewProduct'
        });

    } catch (error) {
        console.log("Error in View Product:", error);
        return res.redirect('back');
    }
}

// insert Logic
const insertProduct = async (req, res) => {
    try {
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/products/${req.file.filename}`;
        }
        else {
            console.log("Image Upload Failed or File Missing");
            req.flash('error', 'Image upload failed!');
            return res.redirect('/product/addProduct');
        }

        // Creating Product in Database
        await Product.create({
            category_id: req.body.category_id,
            subCategory_id: req.body.subCategory_id,
            extraCategory_id: req.body.extraCategory_id,
            product_name: req.body.product_name,
            product_brand: req.body.product_brand,
            product_price: req.body.product_price,
            product_old_price: req.body.product_old_price,
            product_qty: req.body.product_qty,
            product_desc: req.body.product_desc,
            product_image: imagePath
        });

        req.flash('success', "Product added successfully!");
        return res.redirect('/product/viewProduct');

    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/product/addProduct');
    }
}

module.exports = { addProductPage, viewProductPage, insertProduct};