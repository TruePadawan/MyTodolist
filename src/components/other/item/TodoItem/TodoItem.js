import { Fragment, useState } from "react";
import TodoItemDetails from "../../dialog/TodoItemDetails/TodoItemDetails";
import styles from "./styles.module.css";

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
		<Fragment>
			<TodoItemDetails
				open={showDetails}
				onClose={closeDetailsDialog}
				todoID={props.id}
				todoData={props.data}
				projectID={props.projectID}
			/>
			<li className={listElClassName} aria-labelledby={props.id}>
				<div id={props.id}>{title}</div>
				<button
					type="button"
					onClick={openDetailsDialog}
					className={styles["details-btn"]}>
					Details
				</button>
			</li>
		</Fragment>
	);
};

export default TodoItem;
