import { Avatar, Box, Flex, Image, Title } from "@mantine/core";
import React from "react";

type Props = {
	un: string;
	rn: string;
};

function Header({ un, rn }: Props) {
	return (
		<Flex
			w="100%"
			p="0.5rem"
			// bg="orange"
			align={"center"}
			gap="1rem"
			justify={"space-between"}>
			<Avatar color="cyan" size={"lg"} radius="xl">
				{un.slice(0, 2).toUpperCase()}
			</Avatar>
			<Title order={2} c="white" tt="capitalize">
				{"You"}
			</Title>
			<Box w="100px" h="100%">
				<Image
					alt={"xl"}
					w={"100%"}
					h={"100%"}
					src="https://www.onlygfx.com/wp-content/uploads/2022/02/orange-sticker-arrow-4.png"></Image>
			</Box>
			<Title order={2} c="white" tt="capitalize">
				{rn}
			</Title>
			<Avatar color="cyan" size={"lg"} radius="xl">
				{rn.slice(0, 2).toUpperCase()}
			</Avatar>
		</Flex>
	);
}

export default Header;
