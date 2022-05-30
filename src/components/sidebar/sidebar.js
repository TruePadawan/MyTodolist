import { useContext } from "react";
import TodoListContext from "../context/TodoListContext";
import { createProjectItem, createJSXProjectItems, persistProjectsListData } from "../../functions/projects";

import styles from "./sidebar.module.css";

const SideBar = (props) => {
  const { contextData, setContextData, userSignedIn } = useContext(TodoListContext);

  function addProject() {
    const project = createProjectItem("Untitled");

    setContextData((projects) => {
      projects[project.id] = project;
      persistProjectsListData(projects, userSignedIn);
      return { ...projects };
    });
  }

  const projectsList = createJSXProjectItems(contextData);

  return (
    <aside className={`${styles["sidebar"]} ${styles[props.state]}`}>
      {props.children}
      <div className={styles["projectsContainer"]}>
        <h2>Projects</h2>
        <button type="button" className={styles["newProjectBtn"]} onClick={addProject}>New Project</button>
        <div className={styles["projects"]}>
          {projectsList}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
