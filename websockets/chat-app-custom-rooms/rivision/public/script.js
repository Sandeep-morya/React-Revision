const socket = io();

const room = document.querySelector(".room-input");
const message = document.querySelector(".msg-input");
const messages = document.querySelector(".all-messages");
const join = document.querySelector(".join-btn");
const send = document.querySelector(".send-btn");
const roomName = document.querySelector(".room-name");

send.onclick = () => {
	const msg = message.value.trim();
	if (msg) {
		message.value = "";
	}
};

join.onclick = () => {};

function displayMessage(msg, position) {
	const p = document.createElement("p");
	p.className = "single-message";
	p.innerHTML = msg;
	p.style.textAlign = position;
	messages.append(p);
}
