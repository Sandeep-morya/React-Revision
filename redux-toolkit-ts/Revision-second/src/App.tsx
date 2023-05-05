import { useState } from "react";
import { addTodo } from "./Redux/todo";
import { useDispatch, useSlice } from "./Redux/utils";
import TodoItem from "./TodoItem";

function TodoApp() {
	const [text, setText] = useState("");

	const todos = useSlice("todoReducer");
	const dispatch = useDispatch();

	return (
		<div className="todo-app">
			<div className="todo-input">
				<input
					placeholder="Enter new todo task"
					type="text"
					value={text}
					onChange={({ target }) => setText(target.value)}
				/>
				<button onClick={() => dispatch(addTodo(text))}>Add</button>
			</div>
			{todos.map((todo) => (
				<TodoItem key={todo.id} {...todo} />
			))}
		</div>
	);
}

export default TodoApp;
