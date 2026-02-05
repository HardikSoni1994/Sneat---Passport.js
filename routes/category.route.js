const express = require('express');
const router = express.Router();

// Controller import
const categoryController = require('../controllers/category.controller');

const upload = require('../middleware/multer.middleware');

router.get('/addCategory', categoryController.addCategoryPage);
router.get('/viewcategory', categoryController.viewCategoryPage);

router.post('/insertcategory', upload.single('category_image'), categoryController.insertCategory);

module.exports = router;