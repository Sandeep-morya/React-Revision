import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo";

const store = configureStore({
	reducer: {
		todoReducer,
	},
});

export default store;
