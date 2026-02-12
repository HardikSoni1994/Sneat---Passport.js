const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.middleware')

const extraCategoryController = require('../controllers/extraCategory.controller');

// Routes
router.get('/addExtraCategory', extraCategoryController.addExtraCategoryPage);
router.post('/insertExtraCategory', upload.single('extraCategory_image'), extraCategoryController.insertExtraCategory);
router.get('/viewExtraCategory', extraCategoryController.viewExtraCategoryPage);
router.get('/deleteExtracategory/:id', extraCategoryController.deleteExtraCategory);
router.get('/editExtraCategory/:id', extraCategoryController.editExtraCategory);
router.post('/updateExtraCategory', upload.single('extraCategory_image'), extraCategoryController.updateExtraCategory);

module.exports = router;