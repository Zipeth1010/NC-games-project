const db = require("../db/connection")

function getCategoriesModel() {
    return db.query(`
    SELECT slug, description FROM categories`)
    .then((result) => {
        return result.rows;
    })
}

module.exports = {getCategoriesModel}

