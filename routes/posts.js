const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const controller = require('../controllers/posts');
const validation = require('../middleware/validate');


// Route to READ all data
router.get('/', controller.getAllPosts, (req, res) => {
    /*  #swagger.tags = ['Posts']
    */
});

// Route to READ a single data according to the id in the url
router.get('/:id', controller.getPostById, (req, res) => {
    /*  #swagger.tags = ['Posts']
    */
});

// Route to CREATE a new post
router.post('/', requiresAuth(), validation.createPost, controller.createPost, (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new post',
        schema: {
            $title: '',
            $author: '',
            $topics: [],
            $status: '',
            $content: ''
        }
    }
    */
});

// Route to UPDATE a post
router.put('/:id', requiresAuth(), validation.updatePost, controller.updatePost, (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update a post',
        schema: {
            title: '',
            author: '',
            topics: [],
            status: '',
            content: ''
        }
    }
    */
});

// Route to DELETE a post
router.delete('/:id', requiresAuth(), controller.deletePost, (req, res) => {
    /*  #swagger.tags = ['Posts']
    */
});

module.exports = router;
