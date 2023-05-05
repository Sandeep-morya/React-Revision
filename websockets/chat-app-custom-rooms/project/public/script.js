const socket = io();

const room = document.querySelector(".room-input");
const message = document.querySelector(".msg-input");
const messages = document.querySelector(".all-messages");
const join = document.querySelector(".join-btn");
const send = document.querySelector(".send-btn");
const roomName = document.querySelector(".room-name");

setTimeout(() => {
	roomName.innerHTML = socket.id;
}, 1000);

send.onclick = () => {
	const msg = message.value.trim();
	if (msg) {
		socket.emit("to-server", msg, room.value);
		displayMessage(msg, "right");
		message.value = "";
	}
};

socket.on("to-client", (msg) => {
	displayMessage(msg, "left");
});

join.onclick = () => {
	const roomId = room.value.trim();
	if (roomId) {
		socket.emit("join-room", roomId, displayMessage);
	}
};

function displayMessage(msg, position) {
	const p = document.createElement("p");
	p.className = "single-message";
	p.innerHTML = msg;
	p.style.textAlign = position;
	messages.append(p);
}
