const express = require("express");
const {getCategories} = require("./Controllers/categories_controllers")
const db = require("./db/connection")

const app = express();

app.get("/api/categories", getCategories);


module.exports = { app }

