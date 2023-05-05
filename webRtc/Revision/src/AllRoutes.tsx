import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Room from "./components/Room";

const AllRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route
				path="/:id"
				element={
					<PrivateRoute>
						<Room />
					</PrivateRoute>
				}
			/>

			<Route path="*" element={<Error />} />
		</Routes>
	);
};
export default AllRoutes;
