const request = require("supertest")
const {app} = require("../app")
const db = require("../db/connection")
const testData = require("../db/data/test-data")
const seed = require("../db/seeds/seed")
const toBeSortedBy = require("jest-sorted")

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end();
})

describe("GET /api/categories", () => {
    test("200: Will return an array of category objects: each of which will have slug and description properties.", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
            expect(body.categories).toBeInstanceOf(Array)
            expect(body.categories).toHaveLength(4)
            body.categories.forEach((game) => {
                expect(game).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
        }) 
    })
})

describe("GET /api/reviews/:review_id", () => {
    test("200: Will return an object corresponding to the review ID with all info", () => {
        return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({body}) => {
            expect(body.review).toBeInstanceOf(Object)
            expect(body.review.review_id).toBe(2)
            expect(body.review.title).toBe('Jenga')
        })
    })
    test("404: Will return a '404: ID not found' when requesting an ID that doesnt exist", () => {
        return request(app)
        .get("/api/reviews/16")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("ID not found")
        })
    })
    test("400: Will return a 400: 'Bad request' if a request is made with a non-number", () => {
        return request(app)
        .get("/api/reviews/not-a-number")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })
})

describe("GET api/reviews", () => {
    test("200: Returns an array with owner, title, review_id, category, review_img_url, created_at, votes, designer & comment count properties", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toBeInstanceOf(Array)
            expect(body.reviews).toHaveLength(13)
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
                    comment_count: expect.any(String)
                })
            })
        })
    })
    test("Check to see if the output of the request is sorted via date", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toBeSortedBy('created_at', {
                descending: true
            })})
    })
})

describe("GET /*", () => {
    test("404: If there is an error with spelling, the response is 404 with the message 'Path not found'.", () => {
        return request(app)
        .get("/api/categoriesss")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Path not found')
        })
    })
})

