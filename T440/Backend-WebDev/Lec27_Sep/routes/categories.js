const express = require('express');

const router = express.Router();

const Category = require('../models/category');



// Create a new category

router.post('/', async (req, res) => {

    try {

        const category = new Category(req.body);

        await category.save();

        res.status(201).json(category);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});



// Get all categories

router.get('/', async (req, res) => {

    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



// Get a single category

router.get('/:id', getCategory, (req, res) => {
    res.json(res.category);
});



// Update a category

router.patch('/:id', getCategory, async (req, res) => {

    if (req.body.name != null) {

        res.category.name = req.body.name;

    }

    if (req.body.description != null) {

        res.category.description = req.body.description;

    }

    if (req.body.parentCategory != null) {

        res.category.parentCategory = req.body.parentCategory;

    }

    try {

        const updatedCategory = await res.category.save();

        res.json(updatedCategory);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});



// Delete a category

router.delete('/:id', getCategory, async (req, res) => {

    try {

        await res.category.remove();

        res.json({ message: 'Category deleted' });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



// Middleware function to get category by ID

async function getCategory(req, res, next) {

    let category;

    try {

        category = await Category.findById(req.params.id);

        if (category == null) {

            return res.status(404).json({ message: 'Cannot find category' });

        }

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }



    res.category = category;

    next();

}



module.exports = router;