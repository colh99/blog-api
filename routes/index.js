const express = require('express');
const router = express.Router();

// Routes
router.use('/', require('./swagger'));
router.use('/posts', require('./posts'));
router.use('/authors', require('./authors'));

module.exports = router;
