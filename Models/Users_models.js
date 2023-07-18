const db = require("../db/connection");

function getUsersModel() {
  return db
    .query(
      `
    SELECT username, name, avatar_url FROM users;`
    )
    .then((result) => {
      return result.rows;
    });
}

function getUserModel(username) {
  return db
    .query(
      `
    SELECT username, name, avatar_url FROM users WHERE username = $1`,
      [username]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Username not found!" });
      }
      return result.rows[0];
    });
}

function checkIfUserExists(username) {
  return db
    .query(
      `
  SELECT * FROM users WHERE username = $1;`,
      [username]
    )
    .then((response) => {
      if (response.rows.length === 1) {
        return Promise.reject({ status: 403, msg: "Username is taken!" });
      } else {
        console.log(response.rows);
        return response.rows;
      }
    });
}

function postUserModel(username, name, avatar_url) {
  if (username === "" || username === null || name === "" || name === null) {
    return Promise.reject({
      status: 400,
      msg: "Username and name are required",
    });
  } else {
    return db
      .query(
        `
    INSERT INTO users
    (username, name, avatar_url)
    VALUES ($1, $2, $3)
    RETURNING *;`,
        [username, name, avatar_url]
      )
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = {
  getUsersModel,
  getUserModel,
  postUserModel,
  checkIfUserExists,
};
