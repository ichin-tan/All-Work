const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Product = require('../models/product');

// Create a new review
router.post('/', async (req, res) => {
  try {
    // Check if the product exists
    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = new Review({
      product: req.body.product,
      customer: req.body.customer,
      rating: req.body.rating,
      comment: req.body.comment
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name')
      .populate('customer', 'firstName lastName');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('customer', 'firstName lastName');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single review
router.get('/:id', getReview, (req, res) => {
  res.json(res.review);
});

// Update a review
router.patch('/:id', getReview, async (req, res) => {
  if (req.body.rating != null) {
    res.review.rating = req.body.rating;
  }
  if (req.body.comment != null) {
    res.review.comment = req.body.comment;
  }

  try {
    const updatedReview = await res.review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review
router.delete('/:id', getReview, async (req, res) => {
  try {
    await res.review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get review by ID
async function getReview(req, res, next) {
  let review;
  try {
    review = await Review.findById(req.params.id)
      .populate('product', 'name')
      .populate('customer', 'firstName lastName');
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find review' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.review = review;
  next();
}

module.exports = router;