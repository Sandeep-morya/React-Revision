const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();

app.use(express.static("public"));

const server = createServer(app);
const io = new Server(server);

io.on("connection", () => {
	console.log("new connection made");
});

app.listen(3000, () => console.log("server is running on 3000"));
