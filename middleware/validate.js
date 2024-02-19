const validator = require('../helpers/validate');

const newPost = async (req, res, next) => {
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
module.exports = {
    newPost
};
