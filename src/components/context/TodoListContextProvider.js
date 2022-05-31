import { useState, useEffect } from "react";
import TodoListContext from "./TodoListContext";
import { persistProjectsListData, getActiveProjectID } from "../../functions/projects";
import { MainController } from "../../controller/controller";

const TodoListContextProvider = (props) => {
  const [contextData, setContextData] = useState(window.localStorage.getObj("projects"));
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [sidebarState, setSideBarState] = useState("opened");
  const [activeProjectID, setActiveProjectID] = useState(getActiveProjectID(contextData));

  useEffect(() => {
    persistProjectsListData(contextData);
  }, [contextData]);

  return (
    <TodoListContext.Provider
      value={{
        contextData,
        setContextData,
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
