const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const Category = require('./models/category');
const Supplier = require('./models/supplier');
const Product = require('./models/product');
const Inventory = require('./models/inventory');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Cosmetics Warehouse API');
});

const newCategory = new Category({
    name: 'Skincare',
    description: 'Products for skin health and beauty'
  });
  
  newCategory.save()
    .then(category => console.log('Category created:', category))
    .catch(err => console.error('Error creating category:', err));
  
  // Creating a new product
  const newProduct = new Product({
    name: 'Hydrating Face Cream',
    description: 'A rich, moisturizing cream for all skin types',
    sku: 'SKN001',
    price: 29.99,
    // category: "123",  // You would need to have a valid category ID here
    // supplier: "123"   // You would need to have a valid supplier ID here
  });
  
  newProduct.save()
    .then(product => console.log('Product created:', product))
    .catch(err => console.error('Error creating product:', err));  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

