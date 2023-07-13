const app = require("./app");

exports.handle400Errors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const testArrayString = ["review_id"];

  if (err.code === "23503" && err.detail.includes(testArrayString)) {
    res.status(404).send({ msg: "ID not found" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Username not found" });
  }
  if (err.code === "23502") {
    res.status(400).send({ msg: "There is no body" });
  }
  next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};
