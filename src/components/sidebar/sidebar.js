import { useContext } from "react";
import TodoListContext from "../context/TodoListContext";
import { appManager } from "../../managers/appManager";
import { createJSXProjectItems } from "../../functions/projects";

import styles from "./sidebar.module.css";


const SideBar = (props) => {
  const { projects, setProjects, userSignedIn } = useContext(TodoListContext);

  function addProject() {
    if (!userSignedIn)
    {
      const project = appManager.addProjectItem(false, { title : "Untitled"});

      setProjects((projects) => {
        // IF THIS IS THE FIRST AND ONLY PROJECT ITEM, MAKE IT ACTIVE
        if (Object.keys(projects).length === 0)
        {
          project.active = true;
        }

        projects[project.id] = project;
        return { ...projects };
      });
      return;
    }
    appManager.addProjectItem(true, {
      title : "Untitled",
      active : false,
      todos : {}
    });
  }

  const projectsList = createJSXProjectItems(projects);

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
