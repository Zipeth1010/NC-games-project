const express = require("express");
const {getCategories} = require("./Controllers/categories_controllers");
const {getReviewById, getReviews} = require("./Controllers/Reviews_controller")
const db = require("./db/connection");
const { handle400Errors, handleCustomErrors, handle404Errors } = require("./error_handlers");
const {getCommentById, postCommentById} = require("./Controllers/comments_controller")

const app = express();

app.use(express.json())

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById)

app.get("/api/reviews", getReviews)

app.get("/api/reviews/:review_id/comments", getCommentById)

app.post("/api/reviews/:review_id/comments", postCommentById)

app.use("/*", (req, res) => {
    res.status(404).send({msg: "Path not found"})
})

app.use(handle400Errors)
app.use(handle404Errors)
app.use(handleCustomErrors)


module.exports = { app }

