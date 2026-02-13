const fs = require('fs');
const path = require('path');
const Category = require('../models/category.model');
const subCategory = require('../models/subCategory.model');
const extraCategory = require('../models/extraCategory.model');
const Product = require('../models/product.model');

// Add Product Page
const addProductPage = async (req, res) => {
    try {
        const categories = await Category.find({ });
        const subCategories = await subCategory.find({ });
        const extraCategories = await extraCategory.find({ });

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

// insert Product Logic
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

// Delete Product Logic
const deleteProduct = async (req, res) => {
    try {
        let id = req.query.id; 
        
        let product = await Product.findById(id);
        
        if (product) {
            let imagePath = path.join(__dirname, '..', 'public', product.product_image);
            
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("File delete karne me error (ya file nahi mili):", err);
                } else {
                    console.log("Image successfully deleted from folder! 🗑️");
                }
            });
            
            await Product.findByIdAndDelete(id);
            req.flash('success', 'Product deleted successfully!');
        } else {
            req.flash('error', 'Product not found!');
        }
        
        return res.redirect('back');

    } catch (error) {
        console.log("Error in Delete Product:", error);
        req.flash('error', 'Something went wrong while deleting');
        return res.redirect('/viewProduct');
    }
}

// Edit Product Page
const editProductPage = async (req, res) => {
    try {
        let id = req.query.id;
        let product = await Product.findById(id);

        let categories = await Category.find({});
        let subCategories = await subCategory.find({});
        let extraCategories = await extraCategory.find({});

        return res.render('product/editProduct', { 
            product: product, 
            categories: categories,
            subCategories: subCategories,
            extraCategories: extraCategories,
            page: 'editProduct' 
        });
    } catch (error) {
        console.log("Error in Edit Page:", error);
        return res.redirect('/product/viewProduct');
    }
}

// Update Product Logic
const updateProduct = async (req, res) => {
    try {
        let id = req.body.id;
        let product = await Product.findById(id);
        
        let imagePath = product.product_image;

        if (req.file) {
            imagePath = `/uploads/products/${req.file.filename}`;

            let oldImagePath = path.join(__dirname, '..', 'public', product.product_image);
            const fs = require('fs');
            fs.unlink(oldImagePath, (err) => {
                if(err) console.log("Old image delete nahi hui:", err);
                else console.log("Old image replaced!");
            });
        }
        await Product.findByIdAndUpdate(id, {
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

        req.flash('success', 'Product updated successfully!');
        return res.redirect('/product/viewProduct');

    } catch (error) {
        console.log("Error in Update Product:", error);
        req.flash('error', 'Something went wrong while updating');
        return res.redirect('back');
    }
}

module.exports = { addProductPage, viewProductPage, insertProduct, deleteProduct, editProductPage, updateProduct};