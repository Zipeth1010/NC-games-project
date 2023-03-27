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

module.exports = {getReviewByIdModel}