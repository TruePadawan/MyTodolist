import { useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import { setActiveProject, persistProjectsListData } from "../../../functions/projects";
import TrashImg from "./resources/trash.png";
import styles from "./ProjectItem.module.css";

const ProjectItem = (props) => {
  const { setContextData, userSignedIn } = useContext(TodoListContext);

  let itemClass = `${styles["projectItem"]} ${(props.active === true) ? styles["active"] : ""}`;

  function makeActive()
  {
    if (props.active === true) return;
    setContextData((projects) => {
      setActiveProject(props.id,projects);
      return { ...projects };
    });
  }

  function updateProjectTitle(e)
  {
    setContextData((projects) => {
      projects[props.id].title = e.target.innerText;
      persistProjectsListData(projects, userSignedIn); // DONT REDRAW PAGE WHEN USER CHANGES PROJECT TITLE
      return projects;
    });
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
        />
      </button>
    </>
  );
};

export default ProjectItem;
