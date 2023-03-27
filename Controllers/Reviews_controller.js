const {getReviewByIdModel} = require("../Models/Review_models")

function getReviewById (req, res) {
    const {review_id} = req.params
    
    getReviewByIdModel(review_id).then((review, err) => {
            res.status(200).send(review)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
}


module.exports = {getReviewById}