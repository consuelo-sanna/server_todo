/* CONTROLLA COSA DEVI METTERE PER CONTROLLARE TEST ENDPOINT */

const { app } = require("../server");
const { server } = require("../server");

const supertest = require("supertest");
const request = supertest(app);
/**
 * Connect to a new in-memory database before running any tests.
 */
//beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */

afterEach(() => server.close());

/**
 * Complete  example.
 */
describe("Post Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request
      .post("/api/users/")
      .send({
        email: "testA@test.it",
        password: "pwpwpw",
        role: "test"
      })
      .expect(200);
  });
});
