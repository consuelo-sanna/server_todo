var express = require("express");
var app = express();
var mongoose = require("mongoose");
const config = require("config");
var cors = require("cors");

/**
 * Per avere una whitelist per il CORS
 */
const whitelist = ["http://localhost:3000"];
const corsOption = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOption));
app.use(express.json()); //per le POST e PUT, permette di vedere i dati in json -> forse dovevi usarlo

app.use("/api/todos", require("./routes/api/todos"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//se la chiave segreta non è presente termina l'applicazione
if (!config.get("jwtSecret")) {
  console.error("FATAL ERROR: jwtSecret is not defined.");
  process.exit(1);
}

// DB Config
// permette di creare un oggetto db con tutte le informazioni per connettermi al db
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//process.env è una var che esiste quando deploy su heroku (e simili?)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Example app listening on port 5000!");
});
