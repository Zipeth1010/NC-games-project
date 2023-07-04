const {
  getCommentByIdModel,
  checkIfIdExists,
  insertComment,
  deleteCommentModel,
  checkIfCommentIdExists,
  patchCommentModel,
} = require("../Models/comments_models");

function getCommentById(req, res, next) {
  const { review_id } = req.params;

  getCommentByIdModel(review_id)
    .then((comments) => {
      if (comments.length === 0) {
        return checkIfIdExists(review_id);
      }
      res.status(200).send({ comments: comments });
    })
    .then(() => {
      res.status(200).send({ comments: [] });
    })
    .catch((err) => {
      next(err);
    });
}

function postCommentById(req, res, next) {
  const { username, body } = req.body;
  const { review_id } = req.params;

  insertComment(username, body, review_id)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteComment(req, res, next) {
  const comment_id = req.params.comment_id;

  checkIfCommentIdExists(comment_id)
    .then(() => {
      deleteCommentModel(comment_id).then(() => {
        res.status(204).send();
      });
    })
    .catch((err) => {
      next(err);
    });
}

function patchComment(req, res, next) {
  const comment_id = req.params.comment_id;

  const votes = req.body["inc_votes"];

  checkIfCommentIdExists(comment_id)
    .then(() => {
      patchCommentModel(comment_id, votes).then((updatedComment) => {
        res.status(200).send({ updatedComment: updatedComment });
      });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getCommentById,
  postCommentById,
  deleteComment,
  patchComment,
};
