const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/multer.middleware');

// Route
router.get('/addProduct', productController.addProductPage);
router.post('/insertProduct', upload.single('product_image'), productController.insertProduct);
router.get('/viewProduct', productController.viewProductPage);

module.exports = router;