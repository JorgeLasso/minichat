class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Listen to event
      socket.on("message-to-server", (data) => {
        // Emit event
        this.io.emit("message-to-client", data);
      });
    });
  }
}

module.exports = Sockets;
