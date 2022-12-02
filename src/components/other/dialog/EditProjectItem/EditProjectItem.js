import { Fragment, useRef } from "react";
import Modal from "../../../other/modal/Modal";
import { InputField } from "../../../Input/InputField";
import "./EditProjectItem.css";

const EditProjectItem = (props) => {
	const titleRef = useRef();

	if (props.open === false) {
		return <Fragment></Fragment>;
	}

	function formSubmitHandler(event) {
		event.preventDefault();
		props.updateProject(props.projectID, { title: titleRef.current.value });
	}

	function deleteButtonClickHandler() {
		props.deleteProject(props.projectID);
	}

	return (
		<Modal close={props.onClose}>
			<form className="d-flex flex-column" onSubmit={formSubmitHandler}>
				<h3>Edit Project</h3>
				<InputField
					inputRef={titleRef}
					type="text"
					minLength="2"
					maxLength="25"
					defaultValue={props.title}
					required
				/>
				<div className="d-flex flex-column gap-1">
					<button type="submit" className="save-btn">
						Save
					</button>
					<button
						type="button"
						className="delete-btn"
						onClick={deleteButtonClickHandler}>
						Delete
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default EditProjectItem;
