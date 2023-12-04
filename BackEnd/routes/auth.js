const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.register(new User({ username }), password);
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error during signup' });
    }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true, message: 'Login successful' });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;
