const {getUsersModel} = require("../Models/Users_models")

function getUsers(req, res, next) {
    getUsersModel().then((users) => {
        res.status(200).send({users: users})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getUsers}