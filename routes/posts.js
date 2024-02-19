const express = require('express');
const router = express.Router();

const controller = require('../controllers/posts');
const validation = require('../middleware/validate');

// Route to READ all data
router.get('/', controller.getAllPosts);

// Route to READ a single data according to the id in the url
router.get('/:id', controller.getPostById);

// Route to CREATE a new post
router.post('/', validation.newPost, controller.createPost);

// Route to UPDATE a post
router.put('/:id', controller.updatePost);

// Route to DELETE a post
router.delete('/:id', controller.deletePost);

module.exports = router;
