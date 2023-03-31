const request = require("supertest");
const { app } = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const toBeSortedBy = require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  test("200: Will return an array of category objects: each of which will have slug and description properties.", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toBeInstanceOf(Array);
        expect(body.categories).toHaveLength(4);
        body.categories.forEach((game) => {
          expect(game).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: Will return an object corresponding to the review ID with all info", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Object);
        expect(body.review.review_id).toBe(2);
        expect(body.review.title).toBe("Jenga");
      });
  });
  test("404: Will return a '404: ID not found' when requesting an ID that doesnt exist", () => {
    return request(app)
      .get("/api/reviews/16")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
  test("400: Will return a 400: 'Bad request' if a request is made with a non-number", () => {
    return request(app)
      .get("/api/reviews/not-a-number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("GET api/reviews", () => {
  test("200: Returns an array with owner, title, review_id, category, review_img_url, created_at, votes, designer & comment count properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeInstanceOf(Array);
        expect(body.reviews).toHaveLength(13);
        body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("Check to see if the output of the request is sorted via date", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("200: Returns an array of comment objects with the right properties/values", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(3);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            review_id: expect.any(Number),
          });
        });
      });
  });
  test("200: Returns an empty array when passed a correct ID with 0 comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("404: Returns an ID not found when fed a correctly formatted ID with no actual owner", () => {
    return request(app)
      .get("/api/reviews/27/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
  test("400: Returns 'Bad request' if given a wrongly formated review_id", () => {
    return request(app)
    .get("/api/reviews/wrong-input/comments")
    .expect(400)
    .then(({body}) => {
        expect(body.msg).toBe("Bad request")
    })
  })
});

describe("POST /api/reviews/:review_id/comments", () => {
    test("201: Correctly posts a comment under the specified review_id", () => {
        return request(app)
        .post("/api/reviews/2/comments")
        .send({
            username: "bainesface",
            body: "This is an example comment to see if this test works."
        })
        .expect(201)
        .then(({body}) => {
            expect(body.comment).toMatchObject({
                body: "This is an example comment to see if this test works.",
                votes: 0,
                author: "bainesface",
                review_id: 2,
                created_at: expect.any(String)
            })
        })
    })
    test("400: if path is formatted incorrectly", () => {
        return request(app)
        .post("/api/reviews/wrong-path/comments")
        .send({
            username: "bainesface",
            body: "This is an example comment to see if this test works."
        })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })
    test("404: Username doesn't exist if given a username which doesn't match users in the users records", () => {
        return request(app)
        .post("/api/reviews/2/comments")
        .send({
            username: "Mark",
            body: "This should produce a 400 status code"
        })
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Username not found")
        })
    })
    test("404: if path is formatted correctly but it is an invalid review_id", () => {
        return request(app)
        .post("/api/reviews/28/comments")
        .send({
            username: "bainesface",
            body: "This is an example comment to see if this test works."
        })
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("ID not found")
        })
    })
    test("400: Bad request if req object has no body", () => {
        return request(app)
        .post("/api/reviews/2/comments")
        .send({
            username: "bainesface",
            body: null,
        })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("There is no body")
        })
    })
})

describe("PATCH /api/reviews/:review_id", () => {
    test("200: Object updated when given the right parameters", () => {
        return request(app)
        .patch("/api/reviews/2")
        .send({
            inc_votes: 4
        })
        .expect(200)
        .then(({body}) => {
            expect(body.updatedReview).toEqual({
                review_id: 2,
                title: "Jenga",
                category: "dexterity",
                designer: "Leslie Scott",
                owner: "philippaclaire9",
                review_body: "Fiddly fun for all the family",
                review_img_url: "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
                created_at: "2021-01-18T10:01:41.251Z",
                votes: 9
            })
        })
    })
    test("404: if an incorrect review_id is used for the patch request", () => {
        return request(app)
        .patch("/api/reviews/24")
        .send({
            inc_votes: 4
        })
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("ID not found")
        })
    })
    test("400: if a wrongly formatted review_id is provided for the request", () => {
        return request(app)
        .patch("/api/reviews/wrong-url")
        .send({
            inc_votes: 4
        })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })
    test("400: if a wrongly formatted inc_vote is input", () => {
        return request(app)
        .patch("/api/reviews/2")
        .send({
            inc_votes: "wrong input"
        })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })
})

describe("DELETE /api/comments/:comment_id", () => {
    test("204: if given the right comment_id will successfully delete the comment", () => {
        return request(app)
        .delete("/api/comments/6")
        .expect(204)
        .then(({body}) => {
            expect(body.comment).toBe(undefined)
        })
    })
    test("404: If a comment_id is given which doesn't exist but is correctly formatted", () => {
      return request(app)
      .delete("/api/comments/29")
      .expect(404)
    })
    test("400: If given a comment_id which is incorrectly formatted", () => {
      return request(app)
      .delete("/api/comments/wrong-format")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Bad request")
      })
    })
})

describe("GET /api/users", () => {
  test("200: returns an array of objects each object having username, name and avatar_url properties", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      expect(body.users).toHaveLength(4)
      expect(body.users).toBeInstanceOf(Array)
      body.users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        })
      })
      })
    })
    test("404: Path not found if users is spelt incorrectly", () => {
      return request(app)
      .get("/api/userss")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("Path not found")
      })
    })
  })

  
  describe("GET /api/reviews (queries)", () => {
    test("200: Able to sort a query depending on category", () => {
      return request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200)
      .then(({body}) => {
        expect(body.reviews).toHaveLength(11)
        body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            review_id: expect.any(Number),
            title: expect.any(String),
            category: "social deduction",
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number)
        })
      })
      })
    })
    test("200: Accepts an order query and is defaultly ordered by date", () => {
      return request(app)
      .get("/api/reviews?order=ASC")
      .expect(200)
      .then(({body}) => {
        expect(body.reviews).toBeSortedBy("created_at", {
          descending: false
        })
      })
    })
    test("200: Able to sort by a query depending on the values specified", () => {
      return request(app)
      .get("/api/reviews?category=social deduction&sort_by=votes&order=ASC")
      .expect(200)
      .then(({body}) => {
        expect(body.reviews).toHaveLength(11)
        body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            review_id: expect.any(Number),
            title: expect.any(String),
            category: "social deduction",
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number)
        })
        })
        expect(body.reviews).toBeSortedBy("votes", {
          descending: false
        })
      })
    })
    test("400: Invalid sort query if an improper sort by query is fed", () => {
      return request(app)
      .get("/api/reviews?category=social deduction&sort_by=wronganswer")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Invalid sort query")
      })
    })
    test("400: Invalid order query if improper order query is fed", () => {
      return request(app)
      .get("/api/reviews?category=social deduction&sort_by=votes&order=highest")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Invalid order query")
      })
    })
    test("200: If a valid query is fed but there is no results found", () => {
      return request(app)
      .get("/api/reviews?category=children's games")
      .expect(200)
      .then(({body}) => {
        expect(body.msg).toBe("No reviews for selected category")
      })
    })
    test("404: If fed a non existent category", () => {
      return request(app)
      .get("/api/reviews?category=non-existent-category")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("Category not found")
      })
    })
  })

describe("GET /*", () => {
  test("404: If there is an error with spelling, the response is 404 with the message 'Path not found'.", () => {
    return request(app)
      .get("/api/categoriesss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});
