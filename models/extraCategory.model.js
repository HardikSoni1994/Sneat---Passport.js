const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    },
    extraCategory_name: {
        type: String,
        required: true
    }
});

const extraCategory = mongoose.model('extraCategory', extraCategorySchema, 'extraCategory');
module.exports = extraCategory;