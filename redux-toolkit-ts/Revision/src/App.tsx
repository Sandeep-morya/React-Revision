import { getTodos } from "./Redux/todoSlice";
import { useAppSelector as useSelector } from "./Redux/utils";
import { useAppDispatch as useDispatch } from "./Redux/utils";

const App = () => {
	const { isLoading, data } = useSelector((store) => store.todoReducer);
	const dispatch = useDispatch();
	return (
		<div>
			<h2>Todos</h2>
			<br />
			<button onClick={() => dispatch(getTodos())}>Fetch Todos</button>
      {/*---:: Loader ::---*/}
			{isLoading && <h3>Loading...</h3>}

			<ul>
				{data.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
