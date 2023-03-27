const {getCategoriesModel} = require("../Models/categories_models")

function getCategories(req, res) {

    getCategoriesModel().then((categories) => {
        res.status(200).send(categories)
    })
}

module.exports = { getCategories }
