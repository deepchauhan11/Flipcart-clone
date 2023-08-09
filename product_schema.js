const base = require("./mongo")
const mongoose = require('mongoose');

// Define the schema for the Food Item
const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
      },
    name: {
        type: Object,
        required: true
      },
    description: {
        type: String,
        required: true
      },
    price: {
        type: Object,
        required: true
      },
    discount: {
        type: String,
        required: true
      },
    productUrl: {
        type: String,
        required: true
      },
    quantity: {
        type: String,
        required: true
      }     
    });


// Define the model for the Food Item
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
