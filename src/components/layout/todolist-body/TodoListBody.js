import TodoItem from "../../other/item/TodoItem/TodoItem";
import styles from "./styles.module.css";

const TodoListBody = ({ projectID, todos }) => {
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

	return <ul className={styles["todolist-body"]}>{transformedList}</ul>;
};

export default TodoListBody;
