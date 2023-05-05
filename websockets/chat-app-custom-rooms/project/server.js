const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
	socket.on("to-server", (message, id) => {
		if (id) {
			socket.to(id).emit("to-client", message);
		} else {
			socket.broadcast.emit("to-client", message);
		}
	});
	socket.on("join-room", (room, cb) => {
		socket.join(room);
		cb(`joined Room ${room}`);
	});
});

app.use(express.static("public"));

server.listen(3000, () => {
	console.log(`server is running on ${3000}`);
});
