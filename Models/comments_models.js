const db = require("../db/connection")
const format = require('pg-format')


function getCommentByIdModel(review_id) {
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

function insertComment(username, body, review_id) {
    if (body === null){
        return Promise.reject({status: 400, msg: "There is no body"})
    }
    return db.query(`
    INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *;`, [username, body, review_id])
    .then((result) => {
        console.log(result)
        return result.rows[0]
    })
}


module.exports = {getCommentByIdModel, checkIfIdExists, insertComment}