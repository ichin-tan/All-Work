const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Category = require('./models/category');
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');
const Review = require('./models/review');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    await Customer.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    // Create categories
    const categories = await Category.create([
      { name: 'Shirts', description: 'All types of shirts' },
      { name: 'Pants', description: 'Trousers, jeans, and more' },
      { name: 'Accessories', description: 'Belts, ties, and other accessories' },
    ]);

    // Create products
    const products = await Product.create([
      {
        name: 'Classic White Shirt',
        sku: 'CWS001',
        description: 'A timeless white shirt for any occasion',
        price: 49.99,
        category: categories[0]._id,
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        inStock: true,
      },
      {
        name: 'Blue Denim Jeans',
        sku: 'BDJ001',
        description: 'Comfortable and stylish blue jeans',
        price: 79.99,
        category: categories[1]._id,
        size: ['30', '32', '34', '36'],
        color: ['Blue'],
        inStock: true,
      },
      {
        name: 'Leather Belt',
        sku: 'LB001',
        description: 'Classic brown leather belt',
        price: 29.99,
        category: categories[2]._id,
        size: ['One Size'],
        color: ['Brown'],
        inStock: true,
      },
    ]);

    // Create customers
    const customers = await Customer.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA',
        },
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password456',
        address: {
          street: '456 Elm St',
          city: 'Otherville',
          state: 'NY',
          zipCode: '67890',
          country: 'USA',
        },
      },
    ]);

    // Create orders
    const orders = await Order.create([
      {
        customer: customers[0]._id,
        products: [
          { product: products[0]._id, quantity: 1, price: products[0].price },
          { product: products[2]._id, quantity: 1, price: products[2].price },
        ],
        totalAmount: products[0].price + products[2].price,
        status: 'Pending',
        shippingAddress: customers[0].address,
      },
      {
        customer: customers[1]._id,
        products: [
          { product: products[1]._id, quantity: 1, price: products[1].price },
        ],
        totalAmount: products[1].price,
        status: 'Shipped',
        shippingAddress: customers[1].address,
      },
    ]);

    // Create reviews
    await Review.create([
      {
        product: products[0]._id,
        customer: customers[0]._id,
        rating: 5,
        comment: 'Great shirt, very comfortable!',
      },
      {
        product: products[1]._id,
        customer: customers[1]._id,
        rating: 4,
        comment: 'Nice jeans, but a bit tight.',
      },
    ]);

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the seed function
seedData();