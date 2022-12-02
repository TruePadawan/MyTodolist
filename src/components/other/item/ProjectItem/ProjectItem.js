import { Fragment, useContext, useState } from "react";
import EditProjectItem from "../../dialog/EditProjectItem/EditProjectItem";
import { TodoListContext } from "../../../../context/TodoListContextProvider";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { updateProjectItem as updateProjectItemInDB } from "../../../../utils/firebase-utils";
import styles from "./styles.module.css";

const ProjectItem = ({ projectData }) => {
	const [showEditProjectDialog, setShowEditProjectDialog] = useState(false);
	const { authenticatedUserData } = useContext(AuthContext);
	const { setProjectAsActive } = useContext(TodoListContext);

	function editButtonClickHandler() {
		setEditItem(true);
	}

	function buttonClickHandler() {
		if (projectData.active === true) return;

		const userSignedIn = authenticatedUserData !== null;
		if (!userSignedIn) {
			setProjectAsActive(projectData.id);
		} else {
			updateProjectItemInDB(authenticatedUserData.uid, projectData.id, {
				active: true,
			});
		}
	}

	let btnClasses = `${styles["project-item"]} ${
		projectData.active ? styles["active"] : ""
	}`;
	return (
		<Fragment>
			<EditProjectItem
				title={projectData.title}
				projectID={projectData.id}
				open={showEditProjectDialog}
				onClose={() => setShowEditProjectDialog(false)}
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
