import TodoItem from "../../other/item/TodoItem/TodoItem";
import styles from "./styles.module.css";

const TodoListBody = ({ projectID, todos }) => {
	// TRANSFORM DATA TO JSX ELEMENTS
	const transformedList = Object.keys(todos).map((todoItemID) => {
		const todoItemData = todos[todoItemID];
		return (
			<TodoItem
				key={todoItemID}
				id={todoItemID}
				projectID={projectID}
				data={todoItemData}
			/>
		);
	});

	return (
		<div className={styles["todolist-body"]}>
			<ul>{transformedList}</ul>
		</div>
	);
};

export default TodoListBody;
