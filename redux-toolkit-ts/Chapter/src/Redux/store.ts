import { configureStore } from "@reduxjs/toolkit";
import { reducer as todoReducer } from "./todoSlice";

const store = configureStore({
	reducer: {
		todo: todoReducer,
	},
});

export default store;
