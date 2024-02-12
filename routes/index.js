const express = require('express');
const router = express.Router();

// Routes
router.use('/', require('./swagger'));
router.use('/posts', require('./posts'));

module.exports = router;
