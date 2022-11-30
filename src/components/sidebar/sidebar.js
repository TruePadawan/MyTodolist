import { useContext } from "react";
import { appManager } from "../../managers/appManager";
import { v4 as uuidv4 } from "uuid";
import { DB_actions } from "../../functions/firebase_db";
import {
	createJSXProjectItems,
	toLocalStorage,
} from "../../functions/projects";
import { TodoListContext } from "../../context/TodoListContextProvider";
import styles from "./sidebar.module.css";

const SideBar = (props) => {
	const { setProjects } = useContext(TodoListContext);

	function addProject() {
		const item = appManager.createProjectItem("Untitled");
		if (!appManager.userSignedIn) {
			const id = uuidv4();

			setProjects((projects) => {
				projects[id] = item;
				toLocalStorage(projects);
				return { ...projects };
			});
			return;
		}
		DB_actions.addProjectItem(appManager.uid, item);
	}

	const projectsList = createJSXProjectItems(props.data);

	return (
		<aside className={`${styles["sidebar"]} ${styles[props.state]}`}>
			{props.children}
			<div className={styles["projectsContainer"]}>
				<h2>Projects</h2>
				<button
					type="button"
					className={styles["newProjectBtn"]}
					onClick={addProject}>
					New Project
				</button>
				<div className={styles["projects"]}>{projectsList}</div>
			</div>
		</aside>
	);
};

export default SideBar;
