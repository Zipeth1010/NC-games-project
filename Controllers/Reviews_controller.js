const {getReviewByIdModel} = require("../Models/Review_models")

function getReviewById (req, res, next) {
    const {review_id} = req.params

    getReviewByIdModel(review_id).then((review) => {
            res.status(200).send(review)
        })
        .catch((err) => {
            next(err)
        })
}


module.exports = {getReviewById}