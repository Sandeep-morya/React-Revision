import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoType } from "../Types";

export const getTodos = createAsyncThunk("get-todos", async () => {
	return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
});

export const createTodo = createAsyncThunk(
	"create-todo",
	async (todo: TodoType) => {
		return (
			await axios.post("https://jsonplaceholder.typicode.com/todos", todo)
		).data;
	},
);

export const deleteTodo = createAsyncThunk(
	"delete-todo",
	async (id: number) => {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
		return id;
	},
);

const todoSlice = createSlice({
	name: "todo-slice",
	initialState: {
		isLoading: false,
		isError: false,
		data: [] as TodoType[],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTodos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data.push(action.payload);
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = state.data.filter((todo) => todo.id !== action.payload);
			});
			
			// :: For Loading and Error State ::
		builder
			.addMatcher(
				(action) => action.type.endsWith("/pending"),
				(state) => {
					state.isLoading = true;
					state.isError = false;
				},
			)
			.addMatcher(
				(action) => action.type.endsWith("/rejected"),
				(state) => {
					state.isLoading = false;
					state.isError = true;
				},
			);
	},
});

export default todoSlice.reducer;
