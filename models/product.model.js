const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
    extraCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extraCategory',
        required: true
    },

    // 2. Basic Info
    product_name: {
        type: String,
        required: true
    },
    product_brand: {
        type: String,
        required: false 
    },

    // 3. Pricing
    product_price: {
        type: Number,
        required: true
    },
    product_old_price: {
        type: Number,
        required: false
    },

    // 4. Inventory
    product_qty: {
        type: Number,
        required: true
    },

    // 5. Details
    product_desc: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;