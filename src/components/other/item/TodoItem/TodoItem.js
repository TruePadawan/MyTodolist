import { useState } from "react";
import TodoItemDetails from "./TodoItemDetails/TodoItemDetails";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
	const [showDetails, setShowDetails] = useState(false);

	function openDetailsDialog() {
		setShowDetails(true);
	}

	function closeDetailsDialog() {
		setShowDetails(false);
	}

	const { title, done } = props.data;
	const listElClassName = `${styles["todo-item"]} ${
		done ? styles["todo-done"] : ""
	}`;
	return (
		<li className={listElClassName}>
			<span>{title}</span>
			<button
				type="button"
				onClick={openDetailsDialog}
				className={styles["details-btn"]}>
				Details
			</button>
			<TodoItemDetails
				open={showDetails}
				onClose={closeDetailsDialog}
				todoID={props.id}
				todoData={props.data}
			/>
		</li>
	);
};

export default TodoItem;
