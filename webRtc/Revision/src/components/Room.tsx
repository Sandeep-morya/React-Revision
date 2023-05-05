import { useEffect, useMemo, useState } from "react";
import { Flex, ActionIcon } from "@mantine/core";
import { useStream } from "../StreamContextProvider";
import ReactPlayer from "react-player";
import { MdCallEnd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Peer } from "peerjs";

const Room = () => {
	const myStream = useStream();
	const myId = useMemo<string>(() => localStorage.getItem("wa") as string, []);
	const { id: otherId } = useParams();
	const [remoteStream, setRemoteStream] = useState<MediaStream>();
	useEffect(() => {
		if (myId && otherId && myStream) {
			const peer = new Peer(myId);

			const call = peer.call(otherId, myStream);

			call.on("stream", (stream) => {
				setRemoteStream(stream);
			});

			peer.on("call", (call) => {
				call.answer(myStream);
				call.on("stream", (stream) => {
					setRemoteStream(stream);
				});
			});
		}
	}, []);
	console.log("remoteStrem", remoteStream, { otherId }, { myId });

	return (
		<Flex
			w="100vw"
			h="100vh"
			direction={"column"}
			justify="space-evenly"
			align="center"
			gap="2rem">
			<Flex justify={"space-between"} gap="1rem">
				{myStream && (
					<ReactPlayer w="100%" height={"100%"} url={myStream} playing />
				)}
				{remoteStream && (
					<ReactPlayer w="800px" height={"100%"} url={remoteStream} playing />
				)}
			</Flex>

			<ActionIcon variant={"filled"} color="red" radius="xl" size="xl">
				<MdCallEnd />
			</ActionIcon>
		</Flex>
	);
};

export default Room;
