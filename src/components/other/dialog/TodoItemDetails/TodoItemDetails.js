import { useContext, useRef } from "react";
import Modal from "../../modal/Modal";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputField, TextArea } from "../../input/InputField/InputField";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import TodoItemPriority from "../../input/TodoItemPriority/TodoItemPriority";
import Button from "../../button/Button/Button";
import { TODO_TITLE_MINLENGTH } from "../../../../utils/other-utils";

const TodoItemDetails = (props) => {
	const { updateTodoItem, deleteTodoItem } = useContext(TodoListContext);
	const [todoItemIsDone, setTodoItemIsDone] = useState(props.todoData.done);
	const titleRef = useRef();
	const descRef = useRef();
	const [priority, setPriority] = useState("low");

	function onSwitchChanged(event) {
		setTodoItemIsDone(event.target.checked);
	}

	function onSelectValueChanged(event) {
		setPriority(event.target.value);
	}

	async function formSubmitHandler(event) {
		event.preventDefault();

		const title = titleRef.current.value;
		const desc = descRef.current.value;
		await updateTodoItem(props.todoID, props.projectID, {
			title,
			desc,
			priority,
			done: todoItemIsDone,
		});
		props.onClose();
	}

	async function onDeleteBtnClicked() {
		deleteTodoItem(props.todoID, props.projectID);
	}

	return (
		<Modal
			open={props.open}
			onClose={props.onClose}
			containerProps={{
				className: "dialog-form",
				component: "form",
				onSubmit: formSubmitHandler,
			}}>
			<h3 className="dialog-title">Details</h3>
			<InputField
				label="Title"
				inputRef={titleRef}
				minLength={TODO_TITLE_MINLENGTH}
				defaultValue={props.todoData.title}
				autoFocus
				required
			/>
			<TodoItemPriority value={priority} onChange={onSelectValueChanged} />
			<TextArea
				label="Description"
				inputRef={descRef}
				defaultValue={props.todoData.desc}
			/>
			<FormControlLabel
				sx={{ alignSelf: "flex-start", margin: "0" }}
				control={<Switch checked={todoItemIsDone} onChange={onSwitchChanged} />}
				label="Done?"
				labelPlacement="start"
			/>
			<div className="d-flex flex-column gap-1">
				<Button
					type="submit"
					startIcon={<SaveIcon />}
					sx={{ backgroundColor: "lightgreen" }}>
					Update
				</Button>
				<Button
					type="button"
					startIcon={<DeleteIcon />}
					sx={{ backgroundColor: "indianred", color: "whitesmoke" }}
					onClick={onDeleteBtnClicked}>
					Delete
				</Button>
			</div>
		</Modal>
	);
};

export default TodoItemDetails;
