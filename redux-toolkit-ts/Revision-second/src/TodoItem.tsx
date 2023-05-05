import { FC } from "react";
import { deleteTodo, updateTodo } from "./Redux/todo";
import { useDispatch } from "./Redux/utils";
import TodoType from "./Types";

const TodoItem: FC<TodoType> = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	return (
		<div className="todo-item">
			<input
				type="checkbox"
				checked={completed}
				onChange={() => dispatch(updateTodo(id))}
			/>
			<span>{title}</span>
			<button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
		</div>
	);
};

export default TodoItem;
