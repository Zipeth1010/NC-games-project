const request = require("supertest")
const {app} = require("../app")
const db = require("../db/connection")
const testData = require("../db/data/test-data")
const seed = require("../db/seeds/seed")

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
            expect(body).toBeInstanceOf(Array)
            expect(body).toHaveLength(4)
            body.forEach((game) => {
                expect(game).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
        }) 
    })
})

// describe("GET /*", () => {
//     test("404: If there is an error with spelling, the response is 404 with the message 'Path not found'.", () => {
//         return request(app)
//         .get("/api/catigories")
//         .expect(404)
//         .then(({body}) => {
//             expect(body.msg).toBe('Path not found')
//         })
//     })
// })

