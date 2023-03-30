const { checkIfIdExists } = require("../Models/comments_models")
const {getReviewByIdModel, getReviewsModel, updateVotesModel} = require("../Models/Review_models")


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
    console.log(req.query)
    const {category, sort_by, order} = req.query
    getReviewsModel(category, sort_by, order).then((reviews) => {
        res.status(200).send({reviews: reviews})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

function updateVotes(req, res, next) {
    const {review_id} = req.params
    const votesToAdd = req.body["inc_votes"]

    updateVotesModel(review_id, votesToAdd).then((updatedReview) => {
        if (updatedReview.length === 0){
            return checkIfIdExists(review_id)
        }
        res.status(200).send({updatedReview: updatedReview[0]})
    })
    .catch((err) => {
        next(err)
    })
}


module.exports = {getReviewById, getReviews, updateVotes}