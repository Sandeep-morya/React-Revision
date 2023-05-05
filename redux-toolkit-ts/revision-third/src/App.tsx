import { useEffect, useState } from "react";
import { getTodo, postTodo } from "./Redux/todo";
import useDispatch, { useSlice } from "./Redux/utils";
import TodoItem from "./TodoItem";
import { PropagateLoader as ClipLoader } from "react-spinners";

function TodoApp() {
	const [text, setText] = useState("");
	const { isError, isLoading, todos } = useSlice("todoReducer");
	console.log({ todos });
	const dispatch = useDispatch();
	console.log({ isLoading });

	const handleAddTodo = () => {
		dispatch(postTodo(text));
		setText("");
	};

	useEffect(() => {
		dispatch(getTodo());
	}, [dispatch, getTodo]);

	if (isError) {
		return <h1>503 Server Error</h1>;
	}

	return (
		<div className="todo-app">
			<div className="todo-input">
				<input
					placeholder="Enter new todo task"
					type="text"
					value={text}
					onChange={({ target }) => setText(target.value)}
				/>
				<button onClick={handleAddTodo}>Add</button>
			</div>

			{todos.map((todo) => (
				<TodoItem key={todo.id} {...todo} />
			))}
			{isLoading && (
				<div className="react-loader">
					<ClipLoader
						size={10}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			)}
		</div>
	);
}

export default TodoApp;
