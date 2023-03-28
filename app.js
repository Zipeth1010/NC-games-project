const express = require("express");
const {getCategories} = require("./Controllers/categories_controllers");
const {getReviewById, getReviews} = require("./Controllers/Reviews_controller")
const db = require("./db/connection");
const { handle400Errors, handleCustomErrors } = require("./error_handlers");
const {getCommentById} = require("./Controllers/comments_controller")

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById)

app.get("/api/reviews", getReviews)

app.get("/api/reviews/:review_id/comments", getCommentById)

app.use("/*", (req, res) => {
    res.status(404).send({msg: "Path not found"})
})

app.use(handle400Errors)
app.use(handleCustomErrors)


module.exports = { app }

