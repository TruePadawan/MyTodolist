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
		setShowEditProjectDialog(true);
	}

	function buttonClickHandler() {
		if (projectData.active === true) return;
		setProjectAsActive(projectData.id);
	}

	let componentClassName = `${styles["project-item"]} ${
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
			<li className={componentClassName} aria-labelledby={projectData.id}>
				<button
					aria-label="set project as active"
					type="button"
					className={styles["project-item-btn"]}
					onClick={buttonClickHandler}>
					<span id={projectData.id} className={styles["project-title"]}>
						{projectData.title}
					</span>
				</button>
				<IconButton
					aria-label="edit project"
					type="button"
					onClick={editButtonClickHandler}>
					<EditIcon />
				</IconButton>
			</li>
		</Fragment>
	);
};

export default ProjectItem;
