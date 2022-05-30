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
    setContextData((projects) => {
      let updatedProjectsList = setActiveProject(props.id,projects);
      persistProjectsListData(projects, userSignedIn);
      return updatedProjectsList;
    });
  }

  return (
    <>
      <button type="button" className={itemClass} onClick={makeActive}>
        <span className={styles["projectTitle"]} role="textbox" contentEditable={true} suppressContentEditableWarning={true}>
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
