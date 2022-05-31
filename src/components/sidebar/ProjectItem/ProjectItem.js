import { useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import { persistProjectsListData, setActiveProject, setNewActiveProject } from "../../../functions/projects";
import TrashImg from "./resources/trash.png";
import styles from "./ProjectItem.module.css";

const ProjectItem = (props) => {
  const { setContextData, userSignedIn, setActiveProjectID } = useContext(TodoListContext);

  let itemClass = `${styles["projectItem"]} ${(props.active === true) ? styles["active"] : ""}`;
  if (props.active === true)
  {
    setActiveProjectID(props.id);
  }

  function makeActive()
  {
    if (props.active === true) return;
    setContextData((projects) => {
      let updatedProjects = setActiveProject(props.id,projects);
      return updatedProjects;
    });
  }

  function updateProjectTitle(e)
  {
    setContextData((projects) => {
      projects[props.id].title = e.target.innerText;
      persistProjectsListData(projects, userSignedIn);
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

    setContextData((projects) => {
      delete projects[props.id];
      return { ...projects };
    });
    
    if (props.active === true)
    {
      setContextData((projects) => {
        let newList = setNewActiveProject(projects);
        if (newList !== null)
        {
          return newList;
        }
        return {};
      });
      setActiveProjectID(null);
    }
  }

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
