const {getReviewByIdModel} = require("../Models/Review_models")

function getReviewById (req, res, next) {
    const {review_id} = req.params

    getReviewByIdModel(review_id).then((review) => {
        console.log(review)
            res.status(200).send({review: review})
        })
        .catch((err) => {
            next(err)
        })
}


module.exports = {getReviewById}