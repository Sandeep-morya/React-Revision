const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log("user connected", socket.id);

	socket.on("from-client", (msg) => {
		io.emit("from-server", msg);
		// socket.broadcast.emit("from-server", msg);
	});
	socket.on("disconnect", () => {
		console.log("disconnect", socket.id);
	});
});

server.listen("3000", () => {
	console.log("server is running on 3000");
});
