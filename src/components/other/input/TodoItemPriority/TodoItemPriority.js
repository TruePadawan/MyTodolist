import styles from "./styles.module.css";

export default function TodoItemPriority({ className = "", ...otherProps }) {
	const componentClassName = `${styles["todo-item-priority"]} ${className}`;
	return (
		<div className={componentClassName}>
			<label htmlFor="todo-priority" style={{ fontSize: "1.2rem" }}>
				Priority
			</label>
			<select
				aria-label="Todo item priority"
				title="TodoItem Priority"
				id="todo-priority"
				{...otherProps}>
				<option value="low">Low Priority</option>
				<option value="med">Medium Priority</option>
				<option value="high">High Priority</option>
			</select>
		</div>
	);
}
