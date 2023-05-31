const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const AdminUser = require('../models/AdminUser');
const authenticate = require('../middleware/authenticate');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Register a new admin user
router.post('/register',
    [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        check('name', 'Please provide a name').not().isEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, name, user_role } = req.body;

            let user = await AdminUser.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new AdminUser({ email, password, name, user_role });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Generate and return the JWT token
            const token = jwt.sign(payload, config.secretKey, { expiresIn: '1h' });

            // Set the token as a cookie
            res.cookie('token', token, {
                //if secure: true => access only with https
                secure: false,
                // httpOnly: true,
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            });

            res.json({ message: 'Registration successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

// Change password for the admin user (protected)
router.put('/change-password',
    [
        check('currentPassword', 'Please enter your current password').not().isEmpty(),
        check('newPassword', 'Please enter a new password with 6 or more characters').isLength({ min: 6 }),
    ],
    authenticate,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;
            const user = await AdminUser.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password
            user.password = hashedPassword;
            await user.save();

            res.json({ message: 'Password changed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

// Login route
router.post('/login',
    [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Please enter a password').not().isEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            const user = await AdminUser.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Generate and return the JWT token
            const token = jwt.sign(payload, config.secretKey, { expiresIn: '1h' });

            // Set the token as a cookie
            res.cookie('token', token, {
                //if secure: true => access only with https
                secure: false,
                // httpOnly: true,
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            });

            res.json({ message: 'Login successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

// Logout route
router.get('/logout', (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

module.exports = router;
