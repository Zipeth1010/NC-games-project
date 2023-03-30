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
    return db.query(`
    INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *;`, [username, body, review_id])
    .then((result) => {
        return result.rows[0]
    })
}

function deleteCommentModel(comment_id) {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;`, [comment_id])
    .then((result) => {
        console.log(result)
        return result.rows
    })
}

function checkIfCommentIdExists(comment_id){
    // console.log(comment_id)
    // const regex = /\d/;
    // if (regex.test(comment_id) !== true){
    //     Promise.reject({status: 400, msg: "Bad request"})
    // }
    return db.query(`
    SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then((result) => {
        if (result.rowCount === 0){
            return Promise.reject({status:404, msg: "Comment_id not found"})
        }
    })
}


module.exports = {getCommentByIdModel, checkIfIdExists, insertComment, deleteCommentModel, checkIfCommentIdExists}