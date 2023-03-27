const app = require("../app")

exports.handle404Errors = (err, req, res, next) => {
        res.status(404).send({msg: "Path not found"})
}

