const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = { email: "test@test.it", password: "pwpwpw" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ email: "test@test.it" });
    expect(insertedUser).toEqual(mockUser);
  });
});
