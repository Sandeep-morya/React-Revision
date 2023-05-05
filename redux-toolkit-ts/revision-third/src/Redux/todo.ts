import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodoType from "../Types";
import { API } from "./utils";

// :: GET ::
export const getTodo = createAsyncThunk("get-todo", async () => {
	return (await API.get("/todos")).data;
});

// :: POST ::
export const postTodo = createAsyncThunk("post-todo", async (title: string) => {
	return (await API.post("/todos", { title, completed: false })).data;
});

// :: PUT ::
export const putTodo = createAsyncThunk("put-todo", async (todo: TodoType) => {
	return (await API.put(`/todos/${todo.id}`, todo)).data;
});

// :: DELETE ::
export const deleteTodo = createAsyncThunk(
	"delete-todo",
	async (id: number) => {
		await API.delete(`/todos/${id}`);
		return id;
	},
);

const todoSlice = createSlice({
	name: "todo-slice",
	initialState: {
		isLoading: false,
		isError: false,
		todos: [] as TodoType[],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTodo.fulfilled, (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.todos = action.payload;
		});

		builder.addCase(postTodo.fulfilled, (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.todos.push(action.payload);
		});

		builder.addCase(putTodo.fulfilled, (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.todos = state.todos.map((t) =>
				t.id === action.payload.id ? action.payload : t,
			);
		});

		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.todos = state.todos.filter((t) => t.id !== action.payload);
		});
		// Loading and error states management
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
					state.isError = true;
					state.isLoading = false;
				},
			);
	},
});

export default todoSlice.reducer;
