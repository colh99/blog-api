const validator = require('../helpers/validate');

const createPost = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "author": "required|string",
        "topics": "required|array",
        "status": "required|string|in:Published,Draft",
        "content": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const updatePost = async (req, res, next) => {
    const validationRule = {
        "title": "string",
        "author": "string",
        "topics": "array",
        "status": "string|in:Published,Draft",
        "content": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}


const createAuthor = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "about": "required|string",
        "favoriteTopics": "required|array",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const updateAuthor = async (req, res, next) => {
    const validationRule = {
        "name": "string",
        "about": "string",
        "favoriteTopics": "array",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}


module.exports = {
    createPost,
    updatePost,

    createAuthor,
    updateAuthor
};
