const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/multer.middleware');

// Route
router.get('/addProduct', productController.addProductPage);
router.post('/insertProduct', upload.single('product_image'), productController.insertProduct);
router.get('/viewProduct', productController.viewProductPage);
router.get('/deleteProduct', productController.deleteProduct);
router.get('/editProduct', productController.editProductPage);
router.post('/updateProduct', upload.single('product_image'), productController.updateProduct);

module.exports = router;