import React, { useState } from "react";
import { Button, Input, Text, useMantineTheme } from "@mantine/core";

export interface User {
	id: string;
	name: string;
}
interface Props {
	users: User[];
	startChat({ id, name }: User): void;
}

const Friends = ({ users, startChat }: Props) => {
	// Get the Mantine theme for styling
	const theme = useMantineTheme();

	return (
		<div
			style={{
				backgroundColor: "rgba(255,255,255,0.5)",
				maxWidth: 600,
				padding: "1rem",
				borderRadius: "0.5rem",
				margin: "auto",
			}}>
			<h1 style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
				Online Users and Contact List
			</h1>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					marginBottom: theme.spacing.xl,
				}}>
				<Text
					variant="h3"
					weight={500}
					style={{ marginBottom: theme.spacing.md }}>
					Total Online Users - {users.length}
				</Text>

				<div style={{ marginBottom: theme.spacing.lg }}>
					{users.map((user) => (
						<div
							key={user.id}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								backgroundColor:
									theme.colorScheme === "dark" ? "#333" : "#f5f5f5",
								padding: "0.25rem",
								borderRadius: theme.radius.md,
								margin: "0.5rem",
							}}>
							<Text
								style={{
									marginRight: theme.spacing.sm,
								}}>{`${user.name} - ${user.id}`}</Text>

							<Button onClick={() => startChat(user)}>Start Chat</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Friends;
