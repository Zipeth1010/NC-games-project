

function getApi(req, res, next) {
    console.log("in controller")
    const endpoints = {
        "GET /api": {
          "description": "serves up a json representation of all the available endpoints of the api"
        },
        "GET /api/categories": {
          "description": "serves an array of all categories",
          "queries": [],
          "exampleResponse": {
            "categories": [
              {
                "description": "Players attempt to uncover each other's hidden role",
                "slug": "Social deduction"
              }
            ]
          }
        },
        "GET /api/reviews": {
          "description": "serves an array of all reviews",
          "queries": ["category", "sort_by", "order"],
          "exampleResponse": {
            "reviews": [
              {
                "title": "One Night Ultimate Werewolf",
                "designer": "Akihisa Okui",
                "owner": "happyamy2016",
                "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "category": "hidden-roles",
                "created_at": 1610964101251,
                "votes": 5
              }
            ]
          }
        },
        "GET /api/reviews/:review_id": {
          "description": "serves an object corresponding to the review ID parameter being input",
          "queries": [],
          "exampleResponse": {
              "review": {
                "review_id": 2,
                "title": "JengARRGGGH!",
                "category": "dexterity",
                "designer": "Leslie Scott",
                "owner": "grumpy19",
                "review_body": "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
                "review_img_url": "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
                "created_at": "2021-01-18T10:01:41.251Z",
                "votes": 5
            }
          }
        },
        "GET /api/reviews/:review_id/comments": {
          "description": "serves an array of comment objects relating to the review_id",
          "queries": [],
          "exampleResponse" : {
          "comments": [
            {
              "comment_id": 1,
              "body": "I loved this game too!",
              "review_id": 2,
              "author": "happyamy2016",
              "votes": 16,
              "created_at": "2017-11-22T12:36:03.389Z"
            },
            {
              "comment_id": 4,
              "body": "EPIC board game!",
              "review_id": 2,
              "author": "tickle122",
              "votes": 16,
              "created_at": "2017-11-22T12:36:03.389Z"
            }
          ]
        }
        },
        "POST api/reviews/:review_id/comments": {
          "description" : "Inputs an object into the reviews and will respond with the object being input",
          "queries" : [],
          "exampleResponse": {
            "comment": {
              "comment_id": 10,
              "body": "Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.",
              "review_id": 2,
              "author": "grumpy19",
              "votes": 9,
              "created_at": "2021-03-27T14:15:31.110Z"
            }
          }
        },
        "PATCH api/reviews/:review_id": {
          "description" : "Updates the votes on a review based on the id",
          "queries": [],
          "exampleResponse" : {
            "updatedReview" : {
              "review_id": 3,
              "title": "Karma Karma Chameleon",
              "category": "hidden-roles",
              "designer": "Rikki Tahta",
              "owner": "happyamy2016",
              "review_body": "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ",
              "review_img_url": "https://images.pexels.com/photos/45868/chameleon-reptile-lizard-green-45868.jpeg?w=700&h=700",
              "created_at": "2021-01-18T10:01:42.151Z",
              "votes": 10,
              "comment_count": "5"
            }
          }
        },
        "DELETE /api/comments/:comment_id" : {
          "description" : "Deletes a comment depending on the comment id being input",
          "queries" : [],
          "exampleResponse" : {}
        },
        "GET /api/users": {
          "description" : "Retrieves all of the users in the DB in an array",
          "queries": [],
          "exampleResponse" : {
            "users": [
              {
                "username": "tickle122",
                "name": "Tom Tickle",
                "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
              },
              {
                "username": "grumpy19",
                "name": "Paul Grump",
                "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
              },
              {
                "username": "happyamy2016",
                "name": "Amy Happy",
                "avatar_url": "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
              },
              {
                "username": "cooljmessy",
                "name": "Peter Messy",
                "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
              },
              {
                "username": "weegembump",
                "name": "Gemma Bump",
                "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
              },
              {
                "username": "jessjelly",
                "name": "Jess Jelly",
                "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141"
              }
            ]
          }
        }
      }
      res.status(200).send({api: endpoints})
}

module.exports = {getApi}