import { getTodos } from "./Redux/todoSlice";
import { useAppDispatch, useAppSelector } from "./Redux/utils";

const App = () => {
	const { todos, isLoading } = useAppSelector((e) => e.todo);
	const dispactch = useAppDispatch();

	return (
		<div>
			<button onClick={() => dispactch(getTodos())}>GetTodos</button>

			{isLoading && <h2>Loading...</h2>}
			<ul>
				{todos && todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
			</ul>
		</div>
	);
};

export default App;
