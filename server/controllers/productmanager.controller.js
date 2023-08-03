const product = require('../models/productmanager.model');


const testConnection = (req, res) => {
    res.status(400).json({message: "successfully connected"})
}


const createProduct = (req, res) => {
    product.create(req.body)
        .then((newProduct) => res.json(newProduct))
        .catch((err) => res.status(400).json({ message: 'Something went wrong', error: err }));
}


const findAllProduct= (req, res) => {
    product.find()
        .then((allProduct) => res.json(allProduct))
        .catch((err) => res.status(400).json({ message: 'Something went wrong', error: err }));
}


const findOneProduct= (req, res) => {
    product.findOne({ _id: req.params.id })
        .then((oneProduct) => res.json(oneProduct))
        .catch((err) => res.status(400).json({ message: 'Something went wrong', error: err }));
}


const updateProduct = (req, res) => {
    product.findOneAndUpdate({ _id: req.params.id },req.body,{ new: true, runValidators: true })
        .then((updatedProduct) => res.json(updatedProduct))
        .catch((err) => res.status(400).json({ message: 'Something went wrong', error: err }));
}


const deleteProduct = (req, res) => {
    product.deleteOne({ _id: req.params.id })
        .then((deleteProduct)=> res.json(deleteProduct))
        .catch((err) => res.status(400).json({ message: 'Something went wrong', error: err }));
}


module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    updateProduct,
    deleteProduct,
    testConnection,
};