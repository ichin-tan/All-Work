const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password, // Note: In a real application, ensure this is hashed
      address: req.body.address
    });

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().select('-password'); // Exclude password from the response
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single customer
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// Update a customer
router.patch('/:id', getCustomer, async (req, res) => {
  if (req.body.firstName != null) {
    res.customer.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.customer.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.address != null) {
    res.customer.address = req.body.address;
  }
  // Note: Updating password should involve hashing the new password

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a customer
router.delete('/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get customer by ID
async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id).select('-password');
    if (customer == null) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;