const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// :: Will be called when user is connected ::
io.on("connection", (socket) => {
	console.log("a user connected");

	// :: Reading Message from client ::
	socket.on("client", (message) => {
		// :: with this line we are sending  message to
		// other who are connected with this websocket and  to the sender also ::
		// io.emit("server", message);

		// :: currenty we are send the message to all the users who are connected execpt the sender ::
		socket.broadcast.emit("server", message);
	});

	// :: Disconnect if user has closed the tab ::
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(8080, () => {
	console.log("Listening on *:8080");
});
