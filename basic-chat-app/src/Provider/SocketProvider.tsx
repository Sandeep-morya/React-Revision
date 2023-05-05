import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as newID } from "uuid";

const SocketContext = createContext(
	{} as {
		socket: Socket | null;
		id: string;
		name: string;
	},
);

export function useSocket() {
	return useContext(SocketContext);
}

const name = prompt("Enter your Name") || "unknown";

function SocketProvider({ children }: { children: JSX.Element }) {
	const id = useMemo(() => newID(), []);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io("http://localhost:3000", {
			query: { id, name },
		});
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);
	return (
		<SocketContext.Provider value={{ socket, id, name }}>
			{children}
		</SocketContext.Provider>
	);
}

export default SocketProvider;
