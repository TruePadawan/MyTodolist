import { useRef, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Modal from "../../modal/Modal";
import { InputField, TextArea } from "../../Input/InputField";
import { TodoListContext } from "../../../context/TodoListContextProvider";
import { Alert, Button, Snackbar } from "@mui/material";
import styles from "./styles.module.css";

const initialSnackbarState = { severity: "error", text: "", open: false };
const CreateTodoItemDialog = ({ onClose }) => {
	const { addTodoItemToActiveProject } = useContext(TodoListContext);
	const [addBtnIsDisabled, setAddBtnIsDisabled] = useState(false);
	const [snackbarData, setSnackbarData] = useState(initialSnackbarState);
	const titleRef = useRef();
	const descRef = useRef();
	const priorityRef = useRef();

	const handleError = (errorText, errorObj) => {
		setSnackbarData({ severity: "error", text: errorText, open: true });
	};

	const closeSnackbar = () => {
		setSnackbarData(initialSnackbarState);
	};

	const formSubmitHandler = async (event) => {
		event.preventDefault();

		setAddBtnIsDisabled(true);
		const title = titleRef.current.value;
		const description = descRef.current.value;
		const priority = priorityRef.current.value;

		const todoItemData = {
			title,
			description,
			priority,
			done: false,
		};

		try {
			await addTodoItemToActiveProject(todoItemData);
			onClose();
		} catch (error) {
			handleError("Unable to complete action", error);
		}
		setAddBtnIsDisabled(false);
	};

	return (
		<Modal close={onClose}>
			<form onSubmit={formSubmitHandler}>
				<h3>Create Todo Item</h3>
				<div className="d-flex flex-column p-1">
					<InputField
						inputRef={titleRef}
						label={"Title"}
						minLength="3"
						placeholder="Review calculus in Math"
						autoFocus
						required
					/>
					<select
						ref={priorityRef}
						className={styles["todo-item-priority"]}
						required>
						<option value="low">Low Priority</option>
						<option value="med">Medium Priority</option>
						<option value="high">High Priority</option>
					</select>
					<TextArea
						label={"Description"}
						inputRef={descRef}
						placeholder="Review calculus in math before saturday"
						required
					/>
					<Button
						startIcon={<AddTaskIcon />}
						className={styles["add-todo-btn"]}
						disabled={addBtnIsDisabled}>
						Add
					</Button>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					open={snackbarData.open}
					autoHideDuration={6000}
					onClose={closeSnackbar}>
					<Alert
						onClose={closeSnackbar}
						severity={snackbarData.severity}
						sx={{ width: "100%" }}>
						{snackbarData.text}
					</Alert>
				</Snackbar>
			</form>
		</Modal>
	);
};

export default CreateTodoItemDialog;
