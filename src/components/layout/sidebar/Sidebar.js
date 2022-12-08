import { useContext, useState } from "react";
import { TodoListContext } from "../../../context/TodoListContextProvider";
import { getProjectItems } from "../../../utils/other-utils";
import CreateProjectDialog from "../../other/dialog/CreateProjectDialog/CreateProjectDialog";
import styles from "./styles.module.css";

const Sidebar = (props) => {
	const { data } = useContext(TodoListContext);
	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	function openCreateProjectDialog() {
		setDialogIsOpen(true);
	}

	function closeCreateProjectDialog() {
		setDialogIsOpen(false);
	}

	const projectsList = getProjectItems(data);
	
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
