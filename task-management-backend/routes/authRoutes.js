const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { loginUser } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be at least 6 characters').isLength({ min: 6 })
  ],
  authController.registerUser
);

// Login user
router.post('/login', loginUser);

// Example protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;
