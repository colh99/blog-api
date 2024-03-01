const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const controller = require('../controllers/authors');
const validation = require('../middleware/validate');

// Route to READ all data
router.get('/', controller.getAllAuthors);

// Route to READ a single data according to the id in the url
router.get('/:id', controller.getAuthorById);

// Route to CREATE a new author
router.post('/', requiresAuth(), validation.createAuthor, controller.createAuthor);

// Route to UPDATE a post
router.put('/:id', requiresAuth(), validation.updateAuthor, controller.updateAuthor);

// Route to DELETE a post
router.delete('/:id', requiresAuth(), controller.deleteAuthor);

module.exports = router;
