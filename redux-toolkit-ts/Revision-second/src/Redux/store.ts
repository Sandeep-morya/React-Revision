import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo";

const store = configureStore({
	reducer: {
		todoReducer: todoSlice.reducer,
	},
});

export default store;
