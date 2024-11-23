const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      customer: req.body.customerId,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress
    });

    // Validate products and calculate total
    let calculatedTotal = 0;
    for (let item of order.products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      calculatedTotal += product.price * item.quantity;
    }

    // Ensure the calculated total matches the provided total
    if (calculatedTotal !== order.totalAmount) {
      return res.status(400).json({ message: 'Total amount does not match product prices' });
    }

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'firstName lastName email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Update an order (e.g., change status)
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.status != null) {
    res.order.status = req.body.status;
  }
  // Add other fields that can be updated here

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id).populate('customer', 'firstName lastName email').populate('products.product');
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.order = order;
  next();
}

module.exports = router;