import { FC } from "react";
import { deleteTodo, putTodo } from "./Redux/todo";
import useAppDispatch from "./Redux/utils";
import TodoType from "./Types";

const TodoItem: FC<TodoType> = ({ id, title, completed }) => {
	const dispatch = useAppDispatch();
	return (
		<div className="todo-item">
			<input
				type="checkbox"
				checked={completed}
				onChange={() => dispatch(putTodo({ id, title, completed: !completed }))}
			/>
			<span>{title}</span>
			<button onClick={() => dispatch(deleteTodo(id!))}>Delete</button>
		</div>
	);
};

export default TodoItem;
