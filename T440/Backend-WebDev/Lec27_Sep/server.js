const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Category = require("./models/category")
const Customer = require("./models/customer")
const Order = require("./models/order")
const Product = require("./models/product")
const Review = require("./models/review")

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes (we'll add these later)
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.get("/", (req, res) => {
  const cat4 = new Category({
    name: "New Categ",
    description: "Completely new cat"
  })

  cat4.save()
    .then(category => console.log('Category created:', category))
    .catch(err => console.error('Error creating category:', err));

  return res.send("Working");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});