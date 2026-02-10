const express = require('express');
const router = express.Router();

const extraCategoryController = require('../controllers/extraCategory.controller');

// Routes
router.get('/addExtraCategory', extraCategoryController.addExtraCategoryPage);
router.post('/insertExtraCategory', extraCategoryController.insertExtraCategory);

module.exports = router;