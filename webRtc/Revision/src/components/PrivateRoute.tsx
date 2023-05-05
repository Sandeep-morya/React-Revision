import { useLocalStorage } from "@mantine/hooks";
import { useState, FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
interface Props {
	children: JSX.Element;
}
const PrivateRoute: FC<Props> = ({ children }) => {
	const [user] = useState(localStorage.getItem("wa"));
	if (!user) {
		console.log({ user });

		return <Navigate to="/login" />;
	}
	return children;
};

export default PrivateRoute;
