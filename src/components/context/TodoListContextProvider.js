import { useState, useEffect } from "react";
import TodoListContext from "./TodoListContext";
import { persistProjectsListData, getActiveProjectID } from "../../functions/projects";
import { MainController } from "../../controller/controller";

const TodoListContextProvider = (props) => {
  const [projects, setProjects] = useState(window.localStorage.getObj("projects"));
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [sidebarState, setSideBarState] = useState("opened");
  const [activeProjectID, setActiveProjectID] = useState(getActiveProjectID(projects));

  useEffect(() => {
    persistProjectsListData(projects);
  }, [projects]);

  return (
    <TodoListContext.Provider
      value={{
        projects,
        setProjects,
        MainController,
        sidebarState,
        setSideBarState,
        userSignedIn,
        setUserSignedIn,
        activeProjectID,
        setActiveProjectID
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
