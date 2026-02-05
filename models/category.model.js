const mongoose = require('mongoose');

const categorySchema = mongoose.Schema ({
    category_name: {
        type: String,
        required: true
    },
    category_model: {
        type: String,
        required: true
    },
    category_price: {
        type: String,
        required: true
    },
    category_image: {
        type: String,
        required: true
    },
    
});

const Category = mongoose.model('Category', categorySchema, 'Category');
module.exports = Category;