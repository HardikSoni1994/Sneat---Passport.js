const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer.middleware');

// Controller Import
const subCategoryController = require('../controllers/subCategory.controller');

router.get('/addSubCategory', subCategoryController.addSubCategoryPage);
router.get('/viewSubCategory', subCategoryController.viewSubCategoryPage);
router.post('/insertSubcategory', upload.single('subCategory_image'), subCategoryController.insertSubCategory);
router.get('/deleteSubCategory/:id', subCategoryController.deleteSubCategory);
router.get('/editSubCategory/:id', subCategoryController.editSubCategory);
router.post('/updateSubCategory', upload.single('subCategory_image'), subCategoryController.updateSubCategory);

module.exports = router;