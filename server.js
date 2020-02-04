var express = require("express");
var app = express();
var mongoose = require("mongoose");
const config = require("config");

//per le POST e PUT, permette di vedere i dati in json -> forse dovevi usarlo
app.use(express.json());

app.use("/api/todos", require("./routes/api/todos"));

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
