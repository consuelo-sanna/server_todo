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

/*
it("create & save user successfully", async () => {
    const validTodo = new TodoModel(todoComplete);
    const savedTodo = await validTodo.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedTodo._id).toBeDefined();
    expect(savedTodo.testo).toBe(todoComplete.testo);
    expect(savedTodo.completed).toBe(todoComplete.completed);
    expect(savedTodo.user).toBe(todoComplete.user);
    expect(savedTodo.isDeleted).toBe(todoComplete.isDeleted);
    expect(savedTodo.FileSystemPath).toBe(todoComplete.FileSystemPath);
    expect(savedTodo.FileName).toBe(todoComplete.FileName);
  });

  */
