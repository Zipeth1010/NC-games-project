const {getReviewByIdModel, getReviewsModel} = require("../Models/Review_models")


function getReviewById (req, res, next) {
    const {review_id} = req.params

    getReviewByIdModel(review_id).then((review) => {
            res.status(200).send({review: review})
        })
        .catch((err) => {
            next(err)
        })
}

function getReviews(req, res, next) {
    getReviewsModel().then((reviews) => {
        console.log(reviews)
        res.status(200).send({reviews: reviews})
    })
    .catch((err) => {
        next(err)
    })
}


module.exports = {getReviewById, getReviews}