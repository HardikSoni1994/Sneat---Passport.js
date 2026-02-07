const express = require('express');
const router = express.Router();

// Controller Import
const subCategoryController = require('../controllers/subCategory.controller');

router.get('/addSubCategory', subCategoryController.addSubCategoryPage);
router.get('/viewSubCategory', subCategoryController.viewSubCategoryPage);
router.post('/insertSubcategory', subCategoryController.insertSubCategory);
router.get('/deleteSubCategory/:id', subCategoryController.deleteSubCategory);
router.get('/editSubCategory/:id', subCategoryController.editSubCategory);
router.post('/updateSubCategory', subCategoryController.updateSubCategory);

module.exports = router;