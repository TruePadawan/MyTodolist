import { Fragment, useState } from "react";
import { getProjectItems } from "../../../utils/other-utils";
import CreateProjectDialog from "../../other/dialog/CreateProjectDialog/CreateProjectDialog";
import styles from "./styles.module.css";

const Sidebar = (props) => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	function openCreateProjectDialog() {
		setDialogIsOpen(true);
	}

	function closeCreateProjectDialog() {
		setDialogIsOpen(false);
	}

	const projectsList = getProjectItems(props.data);

	const componentClassName = `${styles.sidebar} ${
		props.open ? styles.opened : styles.closed
	}`;
	return (
		<Fragment>
			<CreateProjectDialog
				open={dialogIsOpen}
				onClose={closeCreateProjectDialog}
			/>
			<aside className={componentClassName} aria-label="sidebar">
				{props.children}
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
					<ul className={styles["projects"]}>{projectsList}</ul>
				</section>
			</aside>
		</Fragment>
	);
};

export default Sidebar;
