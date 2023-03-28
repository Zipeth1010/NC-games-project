const db = require("../db/connection")

function getCommentByIdModel(review_id) {
    console.log("in the model")
    return db.query(`
    SELECT * FROM comments
    WHERE review_id = $1;`, [review_id])
    .then((result) => {
        return result.rows
    })
}

function checkIfIdExists(review_id){
    return db.query(`
    SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    .then((result) => {
        if (result.rowCount === 0) {
            return Promise.reject({status:404, msg: "ID not found"})
        } 
    })
}

module.exports = {getCommentByIdModel, checkIfIdExists}