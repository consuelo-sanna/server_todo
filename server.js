var express = require("express");
var app = express();

//per le POST e PUT, permette di vedere i dati in json
//app.use(express.json());

app.use("/api/todos", require("./routes/api/todos"));

//process.env è una var che esiste quando deploy su heroku (e simili?)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Example app listening on port 5000!");
});
