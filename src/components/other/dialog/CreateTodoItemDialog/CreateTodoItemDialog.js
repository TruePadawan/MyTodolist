import { useRef, useContext, useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { InputField, TextArea } from "../../input/InputField/InputField";
import { Alert, Snackbar } from "@mui/material";
import Button from "../../button/Button/Button";
import Modal from "../../modal/Modal";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import TodoItemPriority from "../../input/TodoItemPriority/TodoItemPriority";
import { TODO_TITLE_MINLENGTH } from "../../../../utils/other-utils";

const initialSnackbarState = { severity: "error", text: "", open: false };
const CreateTodoItemDialog = ({ onClose, open, projectID }) => {
	const { addTodoItem } = useContext(TodoListContext);
	const [snackbarData, setSnackbarData] = useState(initialSnackbarState);
	const [priority, setPriority] = useState("low");
	const titleRef = useRef();
	const descRef = useRef();

	function handleError(errorText, errorObj) {
		const text = `${errorText} - ${errorObj.message}`;
		setSnackbarData({ severity: "error", text, open: true });
	}

	function closeSnackbar() {
		setSnackbarData(initialSnackbarState);
	}

	function onSelectValueChanged(event) {
		setPriority(event.target.value);
	}

	async function formSubmitHandler(event) {
		event.preventDefault();
		const title = titleRef.current.value;
		const desc = descRef.current.value;
		const todoItemData = {
			title,
			desc,
			priority,
			done: false,
		};
		try {
			await addTodoItem(todoItemData, projectID);
			onClose();
		} catch (error) {
			handleError("Unable to complete action", error);
		}
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			containerProps={{
				className: "dialog-form",
				component: "form",
				onSubmit: formSubmitHandler,
			}}>
			<h3 className="dialog-title">Create Todo Item</h3>
			<div className="d-flex flex-column p-1 gap-2">
				<InputField
					inputRef={titleRef}
					label={"Title*"}
					minLength={TODO_TITLE_MINLENGTH}
					placeholder="Review calculus in Math"
					autoFocus
					required
				/>
				<TodoItemPriority
					value={priority}
					onChange={onSelectValueChanged}
					id="todo-priority"
				/>
				<TextArea
					label={"Description"}
					inputRef={descRef}
					placeholder="Review calculus in math before saturday"
				/>
				<Button type="submit" variant="contained" startIcon={<AddTaskIcon />}>
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
		</Modal>
	);
};

export default CreateTodoItemDialog;
