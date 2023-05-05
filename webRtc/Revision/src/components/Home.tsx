import { useState } from "react";
import { FcPhoneAndroid } from "react-icons/fc";
import { MdCall } from "react-icons/md";
import { Box, Flex, TextInput, Button, ActionIcon } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useStream } from "../StreamContextProvider";
import ReactPlayer from "react-player";

const Call = () => {
	const myStream = useStream();
	const [mobileNumber, setMobileNumber] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (mobileNumber.length === 10) {
			navigate(`/${mobileNumber}`);
		}
	};

	return (
		<Flex direction={"column"} align={"center"} gap="2rem">
			{myStream && <ReactPlayer url={myStream} playing />}
			<Box component="form" sx={{ display: "flex", gap: "1rem" }}>
				<TextInput
					size={"lg"}
					radius="xl"
					type={"number"}
					value={mobileNumber}
					required
					onChange={(e) => setMobileNumber(e.target.value)}
					icon={<FcPhoneAndroid size={25} />}
					placeholder="Mobile Number"
				/>

				<ActionIcon
					onClick={handleSubmit}
					size={"3.2rem"}
					type="submit"
					variant="filled"
					color="green"
					radius={"xl"}>
					<MdCall size={22} />
				</ActionIcon>
			</Box>
		</Flex>
	);
};

export default Call;
