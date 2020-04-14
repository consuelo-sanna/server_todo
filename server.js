var express = require("express");
const config = require("config");
var cors = require("cors");
const http = require("http");
const log = require("./myLog");
var app = express();
const dbConnection = require("./dbConnection");

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

app.use(cors(/*corsOption*/));
app.use(express.json()); //per le POST e PUT, permette di vedere i dati in json -> forse dovevi usarlo

app.use("/api/todos", require("./routes/api/todos"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/statistics", require("./routes/api/statistics"));

//se la chiave segreta non è presente termina l'applicazione
if (!config.get("jwtSecret")) {
  console.error("FATAL ERROR: jwtSecret is not defined.");
  process.exit(1);
}

//process.env è una var che esiste quando deploy su heroku (e simili?)
const port = process.env.PORT || 5000;

//our server instance
const server = http.createServer(app);

//This creates our socket using the instance of the server
const io = require("socket.io")(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 120000,
  cookie: false
});
//const io = socketIO(server);
const registeredRooms = ["add todo"];

io.on("connection", socket => {
  log.logSocket(
    `${log.myTime()} Socket: connected to socket, NOT logged in, id: ${
      socket.id
    } `
  );

  //esempio inutile per ora
  socket.on("joinRoom", room => {
    //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    log.logSocket("user  trying to joinin room : " + room);
    if (registeredRooms.includes(room)) {
      return socket.emit("success", " Joined room name: " + room);
    } else {
      return socket.emit("err", "Invalid room name: " + room);
    }
    //socket.emit("outgoing todo", { todo }); //per non renderlo a chi ha emesso, usa socket.broadcast.emit
  });

  socket.on("loggedIn", myRoom => {
    log.logSocket("utente loggato in " + myRoom + " ,di id: " + socket.id);
    socket.join(myRoom);
  });

  //riceve il nuovo elemento e rimanda a tutti i presenti eccetto il mandante
  socket.on("newTodo", data => {
    log.logSocket(`New Todo received from the user ${data.username}`);
    io.to("notifyAddRoom").emit("newTodo", data.username);
  });

  socket.on("loggedOut", myRoom => {
    log.logSocket("utente USCITO da " + myRoom + " ,di id: " + socket.id);
    socket.leave(myRoom);
  });

  socket.on("disconnect", () => {
    log.logSocket(`${log.myTime()} user disconnected, id: ${socket.id}`);
  });
});

server.listen(port, () => log.logServizio(`server listening on port ${port}`));

/*app.listen(port, () => {
  console.log("Example app listening on port 5000!");
});
*/

module.exports = { app, server };
