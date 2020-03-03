var mongoose = require("mongoose");
const config = require("config");

// DB Config
// permette di creare un oggetto db con tutte le informazioni per connettermi al db

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
//const uri = await mongod.getConnectionString();

const getMyUri = async () => {
  const uri = await mongod.getConnectionString();
  return uri;
};

const sleep = ms =>
  new Promise((res, rej) => {
    setTimeout(res, ms);
  });

const connectMyDB = async () => {
  const db =
    process.env.NODE_ENV === "test" ? await getMyUri() : config.get("mongoURI");

  //Connect to Mongo

  //await sleep(100000);   test
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));
};

module.exports = connectMyDB();
