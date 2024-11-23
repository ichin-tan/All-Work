const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    size: [String],
    color: [String],
    inStock: { type: Boolean, default: true },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);