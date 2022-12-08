import { useRef, useContext, useState, Fragment } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Modal from "../../modal/Modal";
import { InputField, TextArea } from "../../input/InputField/InputField";
import { Alert, Button, Snackbar } from "@mui/material";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import TodoItemPriority from "../../input/TodoItemPriority/TodoItemPriority";

const initialSnackbarState = { severity: "error", text: "", open: false };
const CreateTodoItemDialog = ({ onClose, open }) => {
	const { addTodoItemToActiveProject } = useContext(TodoListContext);
	const [addBtnIsDisabled, setAddBtnIsDisabled] = useState(false);
	const [snackbarData, setSnackbarData] = useState(initialSnackbarState);
	const [priority, setPriority] = useState("low");
	const titleRef = useRef();
	const descRef = useRef();
	const priorityRef = useRef();

	if (open === false) {
		return <Fragment></Fragment>;
	}

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
		setAddBtnIsDisabled(true);
		const title = titleRef.current.value;
		const desc = descRef.current.value;
		const priority = priorityRef.current.value;

		const todoItemData = {
			title,
			desc,
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
	}

	const btnStyles = {
		width: "100%",
		height: "100%",
		fontFamily: "inherit",
		borderRadius: "inherit",
		color: "brown",
		backgroundColor: "#deaf72",
		"&:hover": {
			backgroundColor: "#a8885d",
		},
		"&:active": {
			backgroundColor: "burlywood",
		},
	};

	return (
		<Modal close={onClose}>
			<form onSubmit={formSubmitHandler} className="dialog-form">
				<h3>Create Todo Item</h3>
				<div className="d-flex flex-column p-1 gap-2">
					<InputField
						inputRef={titleRef}
						label={"Title"}
						minLength="3"
						placeholder="Review calculus in Math"
						autoFocus
						required
					/>
					<div
						className="d-flex flex-column gap-1"
						style={{ fontWeight: "500" }}>
						<label htmlFor="todo-priority" style={{ fontSize: "1.2rem" }}>
							Priority
						</label>
						<TodoItemPriority
							value={priority}
							onChange={onSelectValueChanged}
							id="todo-priority"
						/>
					</div>
					<TextArea
						label={"Description"}
						inputRef={descRef}
						placeholder="Review calculus in math before saturday"
						required
					/>
					<Button
						variant="contained"
						startIcon={<AddTaskIcon />}
						sx={btnStyles}
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
