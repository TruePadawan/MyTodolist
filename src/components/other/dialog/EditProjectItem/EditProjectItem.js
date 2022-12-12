import { Fragment, useRef } from "react";
import { PROJECT_TITLE_MINLENGTH } from "../../../../utils/other-utils";
import Modal from "../../../other/modal/Modal";
import Button from "../../button/Button/Button";
import { InputField } from "../../input/InputField/InputField";

const EditProjectItem = (props) => {
	const titleRef = useRef();

	if (props.open === false) {
		return <Fragment></Fragment>;
	}

	function formSubmitHandler(event) {
		event.preventDefault();
		const projectTitle = titleRef.current.value;
		if (projectTitle.trim().length >= 3) {
			props.updateProject(props.projectID, { title: projectTitle });
			props.onClose();
		}
	}

	function deleteButtonClickHandler() {
		props.deleteProject(props.projectID);
		props.onClose();
	}

	return (
		<Modal
			role="dialog"
			aria-labelledby="edit-project-dialog-title"
			open={props.open}
			onClose={props.onClose}
			containerProps={{
				className: "dialog-form",
				component: "form",
				onSubmit: formSubmitHandler,
			}}>
			<h3 id="edit-project-dialog-title" className="dialog-title">
				Edit Project
			</h3>
			<InputField
				inputRef={titleRef}
				type="text"
				minLength={PROJECT_TITLE_MINLENGTH}
				defaultValue={props.title}
				required
			/>
			<span className="fs-6">Project title must have at least 3 characters!</span>
			<div className="d-flex flex-column gap-1">
				<Button type="submit" sx={{ backgroundColor: "lightgreen" }}>
					Save
				</Button>
				<Button
					type="button"
					sx={{ backgroundColor: "indianred", color: "whitesmoke" }}
					onClick={deleteButtonClickHandler}>
					Delete
				</Button>
			</div>
		</Modal>
	);
};

export default EditProjectItem;
