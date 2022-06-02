import { useContext, useState } from "react";
import { setActiveProject, setNewActiveProject, toLocalStorage } from "../../../functions/projects";
import { appManager } from "../../../managers/appManager";
import { v4 as uuidv4 } from "uuid";
import { DB_actions } from "../../../functions/firebase_db";
import EditProjectItem from "./EditProjectItem/EditProjectItem";
import TodoListContext from "../../context/TodoListContext";
import EditIcon from "./resources/edit.png";

import styles from "./ProjectItem.module.css";

const ProjectItem = (props) => {
  const [onEditItem, setEditItem] = useState(false);
  const { setProjects } = useContext(TodoListContext);

  if (props.active === true) appManager.activeProjectID = props.id;

  function editItem()
  {
    setEditItem(true);
  }
  
  function stopEditing()
  {
    setEditItem(false);
  }

  function makeActive()
  {
    if (!appManager.userSignedIn)
    {
      if (props.active === true) return;
      setProjects((projects) => {
        let updatedProjects = setActiveProject(props.id,projects);
        toLocalStorage(updatedProjects);
        return updatedProjects;
      });
      return;
    }
    DB_actions.updateProjectItem(appManager.uid, props.id, { active : true });
  }

  function updateProjectTitle(newValue)
  {
    if (!appManager.userSignedIn)
    {
      setProjects((projects) => {
        projects[props.id].title = newValue;
        toLocalStorage(projects);
        return { ...projects };
      });
      return;
    }
    DB_actions.updateProjectItem(appManager.uid, props.id, { title : newValue });
  }

  function deleteItem()
  {
    if (!appManager.userSignedIn)
    {
      setProjects((projects) => {
        delete projects[props.id];
        toLocalStorage(projects);
        return { ...projects };
      });
      
      // IF THE DELETED ITEM WAS THE ACTIVE PROJECT, SET A NEW PROJECT AS ACTIVE
      if (props.active === true)
      {
        appManager.activeProjectID = null;
        setProjects((projects) => {
          let newAppData = setNewActiveProject(projects);
          if (newAppData === null) // NO PROJECT ITEMS, CREATE DEFAULT
          {
            const itemID = uuidv4();
            const item = appManager.createProjectItem("Default", true);
            newAppData = {
              [itemID] : item
            };
          }
          toLocalStorage(newAppData);
          return newAppData;
        });
      }
      return;
    }
    DB_actions.deleteProjectItem(appManager.uid, props.id);
  }

  let itemClass = `${styles["projectItem"]} ${(props.active === true) ? styles["active"] : ""}`;
  return (
    <>
    {onEditItem &&
    <EditProjectItem title={props.title} updateTitle={updateProjectTitle} deleteItem={deleteItem} close={stopEditing}/>}

      <button type="button" className={itemClass} onClick={makeActive}>
        <span className={styles["projectTitle"]}>{props.title}</span>
        <img
          className={styles["deleteProjectItem"]}
          role="button"
          src={EditIcon}
          alt="Edit"
          onClick={editItem}
        />
      </button>
    </>
  );
};

export default ProjectItem;
