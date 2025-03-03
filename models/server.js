const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    //Express Server
    this.app = express();
    this.port = process.env.PORT;

    //HTTP Server
    this.server = http.createServer(this.app);

    //Socket Server
    this.io = socketio(this.server, {
      /* Configurations */
    });
  }

  middlewares() {
    //Deploy Public Directory
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //CORS
    this.app.use(cors());
  }

  //Socket Configuration
  socketConfiguration() {
    new Sockets(this.io);
  }

  start() {
    //Initialize Middlewares
    this.middlewares();

    //Initialize Socket Configuration
    this.socketConfiguration();

    //Initialize Server
    this.server.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}`);
    });
  }
}

module.exports = Server;
