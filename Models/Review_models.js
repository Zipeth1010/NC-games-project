const db = require("../db/connection")
const format = require("pg-format")

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

function getReviewsModel(category, sort_by, order) {
    const queryValues = [];
    let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.review_id) AS comment_count FROM reviews FULL OUTER JOIN comments ON comments.review_id = reviews.review_id`
    if (category){
        queryValues.push(category)
        queryStr += ` WHERE reviews.category = $1`
    }
    if (sort_by){
        if (!['review_id', 'title', 'category', 'designer', 'owner', 'review_img_url', 'created_at', 'votes'].includes(sort_by)){
        return Promise.reject({status: 400, msg: "Invalid sort query"})
    }
}
    if (order) {
        if (!['ASC', 'DESC'].includes(order)){
        return Promise.reject({status: 400, msg: "Invalid order query"})
    }
}
if(sort_by && order || !sort_by && order || sort_by && !order || !sort_by && !order){
    queryStr += ` GROUP BY reviews.review_id ORDER BY reviews.`
}
    if (sort_by && order){
        queryStr += `${sort_by} ${order};`
    }
    if (sort_by && !order){
        queryStr += `${sort_by} DESC;`
    }
    if (!sort_by && order){
        queryStr += `created_at ${order};`
    }
    if (!sort_by && !order){
        queryStr += `created_at DESC;`
    }
    return db.query(queryStr, queryValues)
    .then((result) => {
        return result.rows
    })
}

function checkIfCategoryExists(category) {
    return db.query(`SELECT * FROM categories WHERE slug = $1;`, [category])
    .then((result) => {
        console.log(result)
        if (result.rowCount === 1){
            return Promise.reject({status: 404, msg: "No reviews for selected category"})
        } else {
            return Promise.reject({status: 404, msg: "Category not found"})
        }
    })
}

function updateVotesModel(review_id, votesToAdd) {
    return db.query(`
    UPDATE reviews
    SET
    votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`, [votesToAdd, review_id])
    .then((results) => {
        return results.rows
    })
}

module.exports = {getReviewByIdModel, getReviewsModel, updateVotesModel, checkIfCategoryExists}