import { useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import { setActiveProject } from "../../../functions/projects";
import TrashImg from "./resources/trash.png";
import styles from "./ProjectItem.module.css";

const ProjectItem = (props) => {
  const { setContextData } = useContext(TodoListContext);

  let itemClass = `${styles["projectItem"]} ${(props.active === true) ? styles["active"] : ""}`;

  function makeActive()
  {
    setContextData(currentData => {
      let updatedProjectsList = setActiveProject(props.id,currentData);
      return updatedProjectsList;
    });
  }

  return (
    <>
      <button type="button" className={itemClass}>
        <span className={styles["projectTitle"]} role="textbox" contentEditable={true} onClick={makeActive}>
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
