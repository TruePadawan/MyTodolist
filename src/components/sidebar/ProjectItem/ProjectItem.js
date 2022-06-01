import { useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import { persistProjectsListData, setActiveProject, setNewActiveProject } from "../../../functions/projects";
import { appManager } from "../../../managers/appManager";
import TrashImg from "./resources/trash.png";

import styles from "./ProjectItem.module.css";

const ProjectItem = (props) => {
  const { setProjects } = useContext(TodoListContext);

  if (props.active === true)
  {
    appManager.setActiveProjectID(props.id);
  }

  function makeActive()
  {
    if (props.active === true) return;
    setProjects((projects) => {
      let updatedProjects = setActiveProject(props.id,projects);
      return updatedProjects;
    });
  }

  function updateProjectTitle(e)
  {
    setProjects((projects) => {
      projects[props.id].title = e.target.innerText;
      persistProjectsListData(projects, appManager.userSignedIn);
      return projects; // DONT REDRAW PAGE WHEN USER CHANGES PROJECT TITLE
    });
    if (props.active === true)
    {
      document.getElementById("currentProjectTitle").textContent = e.target.innerText;
    }
  }

  function deleteItem(e)
  {
    e.stopPropagation(); // PREVENT CLICK EVENT FROM PROPAGATING TO BUTTON

    setProjects((projects) => {
      delete projects[props.id];
      return { ...projects };
    });
    
    // IF THE DELETED ITEM WAS THE ACTIVE PROJECT, SET A NEW PROJECT AS ACTIVE
    if (props.active === true)
    {
      appManager.setActiveProjectID(null);
      setProjects((projects) => {
        let newList = setNewActiveProject(projects);
        if (newList !== null)
        {
          return newList;
        }
        return {};
      });
    }
  }

  let itemClass = `${styles["projectItem"]} ${(props.active === true) ? styles["active"] : ""}`;
  return (
    <>
      <button type="button" className={itemClass} onClick={makeActive}>
        <span className={styles["projectTitle"]} role="textbox"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={updateProjectTitle}>
          {props.title}
        </span>
        <img
          className={styles["deleteProjectItem"]}
          role="button"
          src={TrashImg}
          alt="Trash"
          onClick={deleteItem}
        />
      </button>
    </>
  );
};

export default ProjectItem;
