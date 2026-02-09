const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory_name: {
        type: String,
        required: true
    },
    subCategory_image: {
        type: String,
        required: true
    },
});

const subCategory = mongoose.model('subCategory', subCategorySchema, 'subCategory');
module.exports = subCategory;