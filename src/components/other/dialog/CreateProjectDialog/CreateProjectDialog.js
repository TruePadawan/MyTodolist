import { Box, Button, Modal } from "@mui/material";
import { useContext, useState } from "react";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import { InputField } from "../../input/InputField/InputField";

export default function CreateProjectDialog(props) {
	const { handleProjectCreation } = useContext(TodoListContext);
	const [projectTitle, setProjectTitle] = useState("");
	const [helperText, setHelperText] = useState("");

	function onInputValueChanged(event) {
		setProjectTitle(event.target.value);
	}

	function formSubmitHandler(event) {
		event.preventDefault();
		if (projectTitle.trim().length < 3) {
			setHelperText("Project title must have at least 3 characters!");
			return;
		}
		handleProjectCreation(projectTitle);
	}

	const contentStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		display: "flex",
		flexDirection: "column",
	};

	return (
		<Modal open={props.open} onClose={props.onClose}>
			<Box
				style={contentStyle}
				component="form"
				className="dialog-form"
				onSubmit={formSubmitHandler}>
				<h3>Create Project</h3>
				<InputField
					label="Project title"
					value={projectTitle}
					onChange={onInputValueChanged}
					minLength={3}
				/>
				<span className="fs-6">{helperText}</span>
				<Button sx={{ alignSelf: "flex-end" }}>Create</Button>
			</Box>
		</Modal>
	);
}
