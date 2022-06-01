import { useState, useEffect } from "react";
import TodoListContext from "./TodoListContext";
import { persistProjectsListData, getActiveProjectID, createProjectItem } from "../../functions/projects";
import { MainController } from "../../controller/controller";

const TodoListContextProvider = (props) => {
  const [projects, setProjects] = useState(window.localStorage.getObj("projects"));
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [sidebarState, setSideBarState] = useState("opened");
  const [activeProjectID, setActiveProjectID] = useState(getActiveProjectID(projects));

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

  return (
    <TodoListContext.Provider
      value={{
        projects, setProjects,
        MainController,
        sidebarState, setSideBarState,
        userSignedIn, setUserSignedIn,
        activeProjectID, setActiveProjectID,
        userID, setUserID,
        createDefaultProject,
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
