const {getCommentByIdModel, checkIfIdExists} = require("../Models/comments_models")

function getCommentById(req, res, next) {
    const {review_id} = req.params

    getCommentByIdModel(review_id).then((comments) => {
        if (comments.length === 0) {
            return checkIfIdExists(review_id)
        }
        res.status(200).send({comments: comments})
    })
    .then(() => {
        res.status(200).send({comments: []})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getCommentById}