const {
  getUsersModel,
  getUserModel,
  postUserModel,
  checkIfUserExists,
} = require("../Models/Users_models");

function getUsers(req, res, next) {
  getUsersModel()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
}

function getUser(req, res, next) {
  const username = req.params.username;
  getUserModel(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
}

function postUser(req, res, next) {
  const { username, name, avatar_url } = req.body;

  checkIfUserExists(username)
    .then(() => {
      postUserModel(username, name, avatar_url)
        .then((user) => {
          res.status(201).send({ user: user });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

module.exports = { getUsers, getUser, postUser };
