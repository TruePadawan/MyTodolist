import { useContext } from "react";
import Modal from "../../modal/Modal";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	updateTodoItem as updateTodoItemInDB,
	deleteTodoItem as deleteTodoItemFromDB,
} from "../../../../utils/firebase-utils";
import { InputField, TextArea } from "../../input/InputField/InputField";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import { Fragment } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import styles from "./styles.module.css";
import TodoItemPriority from "../../input/TodoItemPriority/TodoItemPriority";

const TodoItemDetails = (props) => {
	const { updateTodoItem, deleteTodoItem } = useContext(TodoListContext);
	const { authenticatedUserData } = useContext(AuthContext);
	const [todoItemIsDone, setTodoItemIsDone] = useState(props.todoData.done);
	const [title, setTitle] = useState(props.todoData.title);
	const [desc, setDesc] = useState(props.todoData.desc);
	const [priority, setPriority] = useState("low");
	const userSignedIn = authenticatedUserData !== null;

	function onTitleInputValueChanged(event) {
		setTitle(event.target.value);
	}

	function onDescInputValueChanged(event) {
		setDesc(event.target.value);
	}

	function onSwitchChanged(event) {
		setTodoItemIsDone(event.target.checked);
	}

	function onSelectValueChanged(event) {
		setPriority(event.target.value);
	}

	function formSubmitHandler(event) {
		event.preventDefault();

		if (!userSignedIn) {
			updateTodoItem(props.id, props.projectID, {
				title,
				desc,
				priority,
				done: todoItemIsDone,
			});
		} else {
			updateTodoItemInDB(authenticatedUserData.uid, props.projectID, props.id, {
				title,
				desc,
				priority,
				done: todoItemIsDone,
			});
		}
		props.onClose();
	}

	const onDeleteBtnClicked = () => {
		if (!userSignedIn) {
			deleteTodoItem(props.id, props.projectID);
		} else {
			deleteTodoItemFromDB(
				authenticatedUserData.uid,
				props.projectID,
				props.id
			);
		}
		props.onClose();
	};

	if (props.open === false) {
		return <Fragment></Fragment>;
	}

	return (
		<Modal close={props.onClose}>
			<form className="dialog-form" onSubmit={formSubmitHandler}>
				<h3>Details</h3>
				<InputField
					label="Title"
					value={title}
					onChange={onTitleInputValueChanged}
					minLength="2"
					autoFocus
					required
				/>
				<TextArea
					label="Description"
					value={desc}
					onChange={onDescInputValueChanged}
				/>
				<TodoItemPriority value={priority} onChange={onSelectValueChanged} />
				<FormControlLabel
					control={
						<Switch checked={todoItemIsDone} onChange={onSwitchChanged} />
					}
					label="Done?"
					labelPlacement="start"
				/>
				<div className="d-flex flex-column gap-1">
					<Button
						type="submit"
						className={styles["save-btn"]}
						startIcon={<SaveIcon />}>
						Update
					</Button>
					<Button
						type="button"
						className={styles["delete-btn"]}
						onClick={onDeleteBtnClicked}
						startIcon={<DeleteIcon />}>
						Delete
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default TodoItemDetails;
