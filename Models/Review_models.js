const db = require("../db/connection")

function getReviewByIdModel(id) {
    return db.query(`
    SELECT * FROM reviews WHERE review_id = $1`, [id])
    .then((result) => {
        const review = result.rows
        if (review[0] === undefined){
            return Promise.reject({status: 404, msg: "ID not found"})
        }  return result.rows[0]
    })
}

function getReviewsModel() {
    return db.query(`
    SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.review_id) AS comment_count FROM reviews
    FULL OUTER JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC;`)
    .then((result) => {
        return result.rows
    })
}
module.exports = {getReviewByIdModel, getReviewsModel}