const express = require('express');
const router = express.Router();

const extraCategoryController = require('../controllers/extraCategory.controller');

// Routes
router.get('/addExtraCategory', extraCategoryController.addExtraCategoryPage);
router.post('/insertExtraCategory', extraCategoryController.insertExtraCategory);
router.get('/viewExtraCategory', extraCategoryController.viewExtraCategoryPage);
router.get('/deleteExtracategory/:id', extraCategoryController.deleteExtraCategory);
router.get('/editExtraCategory/:id', extraCategoryController.editExtraCategory);
router.post('/updateExtraCategory', extraCategoryController.updateExtraCategory);

module.exports = router;