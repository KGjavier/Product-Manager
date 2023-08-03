const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Name is required"],
            minLength: [3, "Name must be at least 3 characters"]
        },
        price: {
            type: Number,
            min: [0.01, "Nothing is free"]
        },
        description: {
            type: String,
            minLength:[ 10, "Description must have at least 10 characters" ]

        }
    },{timestamps:true}
);

const product = mongoose.model('product', productSchema);
module.exports = product;