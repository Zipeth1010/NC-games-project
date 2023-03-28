const {getCategoriesModel} = require("../Models/categories_models")

function getCategories(req, res, next) {

    getCategoriesModel().then((categories) => {
        res.status(200).send(categories)
    })
    .catch(next)
}

module.exports = { getCategories }
