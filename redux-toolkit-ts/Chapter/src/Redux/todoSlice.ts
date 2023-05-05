import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoType } from "../types";
import { API } from "./utils";

// Actions
export const getTodos = createAsyncThunk("get-todos", async () => {
	return (await API.get("/todos")).data;
});

// InitialState
const initialState = {
	isLoading: false,
	isError: false,
	todos: [] as TodoType[],
};

const todoSlice = createSlice({
	name: "todo-slice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// :: Loading State::
			.addCase(getTodos.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			// :: Successfull State ::
			.addCase(getTodos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.todos = action.payload;
				state.isError = false;
			})
			// :: Error State ::
			.addCase(getTodos.rejected, (state) => {
				state.isError = true;
				state.isLoading = false;
			});
	},
});

export const { reducer } = todoSlice; // Export the reducer object
