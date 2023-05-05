import { useState } from "react";
import { FcPhoneAndroid } from "react-icons/fc";
import { MdSend } from "react-icons/md";
import { Box, TextInput, Button, ActionIcon } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Navigate } from "react-router-dom";

const Login = () => {
	const [user] = useState(localStorage.getItem("wa"));
	const [mobileNumber, setMobileNumber] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (mobileNumber.length === 10) {
			localStorage.setItem("wa", mobileNumber);
		}
	};
	if (user) {
		console.log("redirecting");
		console.log(user);

		return <Navigate to="/" />;
	}
	return (
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
				<MdSend size={22} />
			</ActionIcon>
		</Box>
	);
};

export default Login;
