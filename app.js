const express = require("express");
const {getCategories} = require("./Controllers/categories_controllers");
const {getReviewById, getReviews} = require("./Controllers/Reviews_controller")
const db = require("./db/connection");
const { handle400Errors, handleCustomErrors, handlePSQLErrors } = require("./error_handlers");
const {getCommentById, postCommentById, deleteComment} = require("./Controllers/comments_controller")
const {updateVotes} = require("./Controllers/Reviews_controller")
// const {getUsers} = require("./Controllers/Users_controller")

const app = express();

app.use(express.json())

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById)

app.get("/api/reviews", getReviews)

app.get("/api/reviews/:review_id/comments", getCommentById)

app.post("/api/reviews/:review_id/comments", postCommentById)

app.patch("/api/reviews/:review_id", updateVotes)

app.delete("/api/comments/:comment_id", deleteComment)

// app.get("/api/users", getUsers)

app.use("/*", (req, res) => {
    res.status(404).send({msg: "Path not found"})
})

app.use(handle400Errors)
app.use(handlePSQLErrors)
app.use(handleCustomErrors)


module.exports = { app }

