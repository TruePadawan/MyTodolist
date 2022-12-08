import styles from "./styles.module.css";

export default function TodoItemPriority({ className = "", ...otherProps }) {
	const componentClassName = `${styles["todo-item-priority"]} ${className}`;
	return (
		<select
			className={componentClassName}
			{...otherProps}
			aria-label="Todo item priority"
			title="TodoItem Priority">
			<option value="low">Low Priority</option>
			<option value="med">Medium Priority</option>
			<option value="high">High Priority</option>
		</select>
	);
}
