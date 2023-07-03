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

module.exports = { getUsersModel, getUserModel };
