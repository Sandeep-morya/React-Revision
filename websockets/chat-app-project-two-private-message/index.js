const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
	socket.on("to-server", (msg, id) => {
		if (id) {
			socket.to(id).emit("to-client", msg);
		} else {
			socket.broadcast.emit("to-client", msg);
		}
	});
});

server.listen(3000, () => console.log("server is running on 3000"));
