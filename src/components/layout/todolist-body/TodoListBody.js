import TodoItem from "../../other/item/TodoItem/TodoItem";
import styles from "./TodoListBody.module.css";

const TodoListBody = ({ todos }) => {
	let todoList = [];

	for (const todoItemID in todos) {
		const itemTitle = todos[todoItemID].title;
		const isItemDone = todos[todoItemID].done;
		todoList.push(
			<TodoItem
				id={todoItemID}
				key={todoItemID}
				title={itemTitle}
				done={isItemDone}
			/>
		);
	}

	return (
		<div className={styles["todolist-body"]}>
			<ul>{todoList}</ul>
			<ul></ul>
		</div>
	);
};

export default TodoListBody;
