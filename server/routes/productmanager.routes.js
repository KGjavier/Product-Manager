const productController = require('../controllers/productmanager.controller');

module.exports = (app) => {
    app.get('/api/test', productController.testConnection);
    app.post('/api/product', productController.createProduct);
    app.get('/api/product', productController.findAllProduct);
    app.get('/api/product/:id', productController.findOneProduct);
    app.put('/api/product/:id', productController.updateProduct);
    app.delete('/api/product/:id', productController.deleteProduct);   
}