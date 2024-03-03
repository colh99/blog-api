const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const controller = require('../controllers/authors');
const validation = require('../middleware/validate');

// Route to READ all data
router.get('/', controller.getAllAuthors, (req, res) => {
    /*  #swagger.tags = ['Authors']
    */
}); 

// Route to READ a single data according to the id in the url
router.get('/:id', controller.getAuthorById, (req, res) => {
    /*  #swagger.tags = ['Authors']
    */
});

// Route to CREATE a new author
router.post('/', requiresAuth(), validation.createAuthor, controller.createAuthor, (req, res) => {
    /*  #swagger.tags = ['Authors']
        #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new author',
        schema: {
            $name: 'John Doe',
            $about: 'About John Doe',
            $favoriteTopics: ['topic1', 'topic2']
        }
    }
    */
});

// Route to UPDATE a post
router.put('/:id', requiresAuth(), validation.updateAuthor, controller.updateAuthor, (req, res) => {
    /*  #swagger.tags = ['Authors']
        #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update an author',
        schema: {
            $name: 'John Doe',
            $about: 'About John Doe',
            $favoriteTopics: ['topic1', 'topic2']
        }
    }
    */
});

// Route to DELETE a post
router.delete('/:id', requiresAuth(), controller.deleteAuthor, (req, res) => { 
    /*  #swagger.tags = ['Authors']
    */
});
module.exports = router;
