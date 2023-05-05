import {
	createStyles,
	Container,
	Title,
	Text,
	Button,
	Flex,
	rem,
	Box,
	TextInput,
	Input,
	ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ChatScreen from "./components/ChatScreen";
import Header from "./components/Header";
import { io } from "socket.io-client";
import { useSocket } from "./Provider/SocketProvider";
import Friends, { User } from "./components/Friends";
import { useLocalStorage } from "@mantine/hooks";
const useStyles = createStyles((theme) => ({
	root: {
		width: "100vw",
		minHeight: "100vh",
		backgroundColor: "#11284b",
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundImage:
			"linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
		paddingTop: `calc(${theme.spacing.xl} * 3)`,
		paddingBottom: `calc(${theme.spacing.xl} * 3)`,
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",

		[theme.fn.smallerThan("md")]: {
			flexDirection: "column",
		},
	},

	image: {
		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	content: {
		paddingTop: `calc(${theme.spacing.xl} * 2)`,
		paddingBottom: `calc(${theme.spacing.xl} * 2)`,
		marginRight: `calc(${theme.spacing.xl} * 3)`,

		[theme.fn.smallerThan("md")]: {
			marginRight: 0,
		},
	},

	title: {
		color: theme.white,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		lineHeight: 1.05,
		maxWidth: rem(500),
		fontSize: rem(48),

		[theme.fn.smallerThan("md")]: {
			maxWidth: "100%",
			fontSize: rem(34),
			lineHeight: 1.15,
		},
	},

	description: {
		color: theme.white,
		opacity: 0.75,
		maxWidth: rem(500),

		[theme.fn.smallerThan("md")]: {
			maxWidth: "100%",
		},
	},
}));

export interface Message {
	user: User;
	message: string;
	time: number;
}

export function App() {
	const [users, setUsers] = useState<User[]>([]);
	const { classes } = useStyles();
	const [currentUser, setCurrentUser] = useState<User>();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([] as Message[]);
	const [showChatScreen, setShowChatScreen] = useState(false);

	const { socket, id, name } = useSocket();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (message && socket && currentUser) {
			setMessages((e) => [
				...e,
				{ user: { id, name }, message, time: Date.now() },
			]);
			socket.emit("message", message, currentUser.id);
		}
		setMessage("");
	}
	function startChat({ id, name }: User) {
		setCurrentUser({ id, name });
		setShowChatScreen(true);
	}

	function handleNewUser(rooms: Record<string, User>) {
		const allUsers = Object.values(rooms) as User[];
		setUsers(allUsers.filter((user) => user.id !== id));
	}

	function handleMessage(message: Message) {
		setMessages((e) => [...e, message]);
	}
	useEffect(() => {
		if (socket) {
			socket.on("user-joined", handleNewUser);
			socket.on("user-left", handleNewUser);
			socket.on("message", handleMessage);
		}

		return () => {
			setMessages([]);
			if (socket) {
				socket.off();
			}
		};
	}, [socket]);

	console.log(messages);

	return (
		<div className={classes.root}>
			<Flex justify="space-around" p="2rem" wrap={"wrap"}>
				<Container size="lg">
					<div className={classes.inner}>
						<div className={classes.content}>
							<Title className={classes.title}>
								A{" "}
								<Text
									component="span"
									inherit
									variant="gradient"
									gradient={{ from: "pink", to: "yellow" }}>
									Basic Chat App
								</Text>{" "}
								Made with React & Socket.io
							</Title>

							<Text className={classes.description} mt={30}>
								Build fully functional accessible web applications with ease –
								Mantine includes more than 100 customizable components and hooks
								to cover you in any situation
							</Text>
							<br />
							<br />
							<Input readOnly value={`${name} : ${id}`} onChange={() => {}} />

							{showChatScreen && (
								<Button
									m="0.5rem"
									variant="gradient"
									size="xl"
									onClick={() => setShowChatScreen(false)}
									gradient={{ from: "orange", to: "red" }}>
									Close
								</Button>
							)}
						</div>
					</div>
				</Container>
				{!showChatScreen && <Friends {...{ users, startChat }} />}

				{showChatScreen && (
					<Flex
						bg="url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSislqYWjHLCDalwQuU8WYyCgYLbbSFymDpXQ&usqp=CAU)"
						bgsz={"cover"}
						direction={"column"}
						sx={{
							width: "50rem",
							height: "80vh",
							borderRadius: "0.5rem",
							position: "relative",
							overflow: "hidden",
						}}>
						<Header un={name} rn={currentUser!.name} />
						<ChatScreen {...{ currentUser, messages }} />
						<Box
							component="form"
							onSubmit={handleSubmit}
							sx={{
								display: "flex",
								width: "100%",
								left: "0",
								bottom: "0%",
								position: "absolute",
							}}>
							<TextInput
								placeholder="Enter Message"
								value={message}
								size="lg"
								autoComplete="off"
								sx={{ flexGrow: 1 }}
								onChange={(event) => setMessage(event.target.value)}
							/>
							<Button
								variant="gradient"
								gradient={{ from: "pink", to: "yellow" }}
								size="lg"
								type="submit">
								Send
							</Button>
						</Box>
					</Flex>
				)}
			</Flex>
		</div>
	);
}
