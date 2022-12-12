import Modal from "../../modal/Modal";
import { useContext, useEffect, useState } from "react";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import { InputField } from "../../input/InputField/InputField";
import Button from "../../button/Button/Button";
import { PROJECT_TITLE_MINLENGTH } from "../../../../utils/other-utils";

export default function CreateProjectDialog(props) {
	const { handleProjectCreation } = useContext(TodoListContext);
	const [projectTitle, setProjectTitle] = useState("");
	const [helperText, setHelperText] = useState("");

	useEffect(() => {
		const id = setTimeout(() => {
			if (projectTitle.trim().length < 3) {
				setHelperText("Project title must have at least 3 characters!");
			} else {
				setHelperText("");
			}
		}, 500);
		return () => clearTimeout(id);
	}, [projectTitle]);

	function onInputValueChanged(event) {
		setProjectTitle(event.target.value);
	}

	function formSubmitHandler(event) {
		event.preventDefault();
		if (projectTitle.trim().length >= 3) {
			handleProjectCreation(projectTitle);
			setProjectTitle("");
			props.onClose();
		}
	}

	return (
		<Modal
			role="dialog"
			aria-labelledby="create-project-dialog-title"
			open={props.open}
			onClose={props.onClose}
			containerProps={{
				className: "dialog-form",
				component: "form",
				onSubmit: formSubmitHandler,
			}}>
			<h3 id="create-project-dialog-title" className="dialog-title">
				Create Project
			</h3>
			<InputField
				label="Project title"
				value={projectTitle}
				onChange={onInputValueChanged}
				minLength={PROJECT_TITLE_MINLENGTH}
				autoFocus={true}
				required
			/>
			{helperText !== "" && <span className="fs-6">{helperText}</span>}
			<Button type="submit">Create</Button>
		</Modal>
	);
}
