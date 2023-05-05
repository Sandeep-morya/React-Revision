import { createSlice } from "@reduxjs/toolkit";
import TodoType from "../Types";

const todoSlice = createSlice({
	name: "todo-slice",
	initialState: [] as TodoType[],
	reducers: {
		// :: Add new Todo ::
		addTodo: (state, action) => {
			const newTodo = {
				id: Math.random(),
				title: action.payload,
				completed: false,
			};
			state.push(newTodo);
		},
		// :: Update Todo ::
		updateTodo: (state, action) => {
			return state.map((todo) =>
				todo.id === action.payload
					? { ...todo, completed: !todo.completed }
					: todo,
			);
		},
		// :: Delete Todo ::
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload);
		},
	},
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice;
