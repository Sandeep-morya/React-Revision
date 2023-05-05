import { Box, Flex, Group, List, Text } from "@mantine/core";
import React from "react";
import { Message } from "../App";
import { useSocket } from "../Provider/SocketProvider";
import { User } from "./Friends";

type Props = {
	messages: Message[];
	currentUser?: User;
};

function ChatScreen({ messages, currentUser }: Props) {
	const { id } = useSocket();
	const sortedMessages = messages
		.sort((a, b) => a.time - b.time)
		.filter((msg) => msg.user.id === id || msg.user.id === currentUser!.id);

	const messagesEndRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		// scroll to the last message when a new message is added
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	return (
		<Flex
			mb="3rem"
			p="0.5rem"
			direction={"column"}
			align="flex-end"
			justify={"flex-end"}
			h="100%"
			sx={{
				overflow: "scroll",
				flexGrow: 1,
				"&::-webkit-scrollbar": { display: "none" },
			}}>
			<Flex h={"max-content"} w={"100%"} direction="column">
				{sortedMessages.map((message, index) => {
					const isFromSender = message.user.id === id;
					const lastmessage = index === sortedMessages.length - 1;

					return (
						<Box
							mb="sm"
							sx={{
								width: "max-content",
								alignSelf: !isFromSender ? "flex-start" : "flex-end",
							}}>
							<Box
								bg={isFromSender ? "blue" : "green"}
								ref={lastmessage ? messagesEndRef : null}
								key={message.time}
								sx={{
									color: "white",
									padding: 8,
									borderRadius: 8,
								}}>
								<Text fw={500}>{message.message}</Text>
							</Box>
							<Text
								size="xs"
								c="white"
								style={{
									display: "block",
									marginTop: 4,
								}}>
								{new Date(message.time).toLocaleString()}
							</Text>
						</Box>
					);
				})}
			</Flex>
		</Flex>
	);
}

export default ChatScreen;
