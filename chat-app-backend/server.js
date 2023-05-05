const io = require("socket.io")(3000, {
	cors: ["http://localhost:5173/"],
});
const rooms = {};

io.on("connection", (socket) => {
	const { id, name } = socket.handshake.query;
	socket.join(id);
	const user = { id, name };
	rooms[id] = user;
	console.log(rooms);

	// Notify all other sockets in the room that a new user has joined
	io.emit("user-joined", rooms);

	socket.on("message", (message, recipient) => {
		socket.to(recipient).emit("message", { message, user, time: Date.now() });
		console.log(recipient);
	});

	socket.on("disconnect", () => {
		console.log(`${id} disconnected`);
		delete rooms[id];

		// Notify all other sockets in the room that a user has left
		io.emit("user-left", rooms);
	});
});
