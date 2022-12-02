import { Fragment, useContext, useState } from "react";
import EditProjectItem from "../../dialog/EditProjectItem/EditProjectItem";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles.module.css";

const ProjectItem = ({ projectData }) => {
	const [showEditProjectDialog, setShowEditProjectDialog] = useState(false);
	const { setProjectAsActive, updateProjectItem, deleteProjectItem } =
		useContext(TodoListContext);

	function editButtonClickHandler() {
		setEditItem(true);
	}

	function buttonClickHandler() {
		if (projectData.active === true) return;
		setProjectAsActive(projectData.id);
	}

	let btnClasses = `${styles["project-item"]} ${
		projectData.active ? styles["active"] : ""
	}`;
	return (
		<Fragment>
			<EditProjectItem
				open={showEditProjectDialog}
				onClose={() => setShowEditProjectDialog(false)}
				title={projectData.title}
				projectID={projectData.id}
				updateProject={updateProjectItem}
				deleteProject={deleteProjectItem}
			/>
			<button
				aria-label="set as active"
				type="button"
				className={btnClasses}
				onClick={buttonClickHandler}>
				<span className={styles["project-title"]}>{projectData.title}</span>
				<IconButton
					aria-label="edit project"
					type="button"
					onClick={editButtonClickHandler}>
					<EditIcon />
				</IconButton>
			</button>
		</Fragment>
	);
};

export default ProjectItem;
