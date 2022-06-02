import { useState, useEffect } from "react";
import TodoListContext from "./TodoListContext";
import { getActiveProjectID } from "../../functions/projects";
import { appManager } from "../../managers/appManager";

const TodoListContextProvider = (props) => {
  const [projects, setProjects] = useState({});
  const [noProjects, setNoProjects] = useState(false);
  const [sidebarState, setSideBarState] = useState("opened");
  appManager.activeProjectID = getActiveProjectID(projects);
  
  useEffect(() => {
    if (Object.keys(projects).length === 0)
    {
      setNoProjects(true);
    } else {
      setNoProjects(false);
    }
  }, [setNoProjects, projects]);
  
  return (
    <TodoListContext.Provider
      value={{
        projects, setProjects,
        noProjects,
        sidebarState, setSideBarState,
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
