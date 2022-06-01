import { useState, useEffect } from "react";
import TodoListContext from "./TodoListContext";
import { persistProjectsListData, getActiveProjectID, createProjectItem } from "../../functions/projects";
import { appManager } from "../../managers/appManager";

const TodoListContextProvider = (props) => {
  const [projects, setProjects] = useState({});
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [sidebarState, setSideBarState] = useState("opened");

  function createDefaultProject() {
    let projectItem = createProjectItem("Default", true);
    let defaultProjectsList = {
      [projectItem.id]: projectItem,
    };
    window.localStorage.setObj("projects", defaultProjectsList);
    setProjects(window.localStorage.getObj("projects"));
  }

  useEffect(() => {
    persistProjectsListData(projects);
  }, [projects]);

  appManager.setActiveProjectID(getActiveProjectID(projects));
  
  return (
    <TodoListContext.Provider
      value={{
        projects, setProjects,
        sidebarState, setSideBarState,
        userSignedIn, setUserSignedIn,
        userID, setUserID,
        createDefaultProject,
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
