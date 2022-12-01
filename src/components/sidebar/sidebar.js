import { appManager } from "../../managers/appManager";
import { v4 as uuidv4 } from "uuid";
import { DB_actions } from "../../functions/firebase_db";
import {
	createJSXProjectItems,
	toLocalStorage,
} from "../../functions/projects";
import styles from "./sidebar.module.css";
import CreateProjectDialog from "../create-project/create-project";
import { useState } from "react";

const Sidebar = (props) => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const projectsList = createJSXProjectItems(props.data);

	function openCreateProjectDialog() {
		setDialogIsOpen(true);
	}

	function closeCreateProjectDialog() {
		setDialogIsOpen(false);
	}

	const componentClassName = `${styles.sidebar} ${
		props.open ? styles.opened : styles.closed
	}`;
	return (
		<aside className={componentClassName}>
			{props.children}
			<CreateProjectDialog
				open={dialogIsOpen}
				onClose={closeCreateProjectDialog}
			/>
			<section
				aria-labelledby="sidebar-title"
				className={styles["projects-section"]}>
				<h2 id="sidebar-title">Projects</h2>
				<button
					type="button"
					className={styles["new-project-btn"]}
					onClick={openCreateProjectDialog}>
					New Project
				</button>
				<div className={styles["projects"]}>{projectsList}</div>
			</section>
		</aside>
	);
};

export default Sidebar;
