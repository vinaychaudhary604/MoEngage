const express = require('express');
const router = express.Router();
const Brewery = require('../models/Brewery');
const Review = require('../models/Review');
const { isLoggedIn } = require('../middleware');

// Search
router.get('/search', isLoggedIn, async (req, res) => {
    try {
        // Implement search logic using Brewery API
        // Display search results in JSON or send them to the frontend
        res.json({ success: true, message: 'Implement search logic' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error during search' });
    }
});

// Brewery page
router.get('/brewery/:id', isLoggedIn, async (req, res) => {
    try {
        const brewery = await Brewery.findById(req.params.id).populate('reviews');
        res.json({ success: true, brewery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error loading brewery details' });
    }
});

// Add review
router.post('/brewery/:id/add-review', isLoggedIn, async (req, res) => {
    try {
        const { rating, description } = req.body;
        const brewery = await Brewery.findById(req.params.id);

        const review = new Review({ rating, description, user: req.user._id });
        await review.save();

        brewery.reviews.push(review);
        await brewery.save();

        res.json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding review' });
    }
});

module.exports = router;
