const express = require("express");
const {getCategories} = require("./Controllers/categories_controllers");
const { handle404Errors } = require("./error_handiling_controller");
const {getReviewById} = require("./Controllers/Reviews_controller")
const db = require("./db/connection")

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById)

app.use("/*", (req, res) => {
    res.status(404).send({msg: "Path not found"})
})


module.exports = { app }

