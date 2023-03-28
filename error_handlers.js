const app = require("./app")

exports.handle400Errors = (err, req, res, next) => {
        if(err.code === "22P02"){
        res.status(400).send({msg: "Bad request"})      
        } else {
        next(err)
        }
}

exports.handleCustomErrors = (err, req, res, next) => {
        if (err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
        }
}

