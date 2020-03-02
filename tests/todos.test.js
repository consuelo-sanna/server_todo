const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const TodoModel = require("../models/TodoModel");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Complete todo example.
 */
const todoComplete = {
  testo: "automatic test",
  completed: false,
  user: "test@gmail.com",
  isDeleted: false,
  FileSystemPath: "awdadadwa443543a",
  FileName: "test.txt",
  data: "2010-12-31T23:00:00.000Z"
};

/**
 * Product test suite.
 */
describe("Todo creation new user", () => {
  /**
   * Tests that a valid todo can be created through the todoService without throwing any errors.
   */
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

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert user successfully, but the field does not defined in schema should be undefined", async () => {
    const todoWithInvalidField = new TodoModel({
      testo: "test",
      completed: false,
      user: "Beau Consu",
      nickname: "not real"
    });
    const savedTodoWithInvalidField = await todoWithInvalidField.save();
    expect(savedTodoWithInvalidField._id).toBeDefined();
    expect(savedTodoWithInvalidField.nickkname).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should us told us the errors is on testo field.

  it("create todo without required field should failed", async () => {
    const todoWithoutRequiredField = new TodoModel({
      user: "Consu",
      testo: "false"
    });
    let err;
    try {
      const savedTodoWithoutRequiredField = await todoWithoutRequiredField.save();
      error = savedTodoWithoutRequiredField;
      console.log("quiiiuiawudiawuhdawiuh: " + error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.completed).toBeDefined();
  });
});
