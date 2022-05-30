import { useState, useEffect } from "react";
import TodoListContext from "./TodoListContext";
import { persistProjectsListData } from "../../functions/projects";
import { MainController } from "../../controller/controller";

const TodoListContextProvider = (props) => {
  const [contextData, setContextData] = useState(window.localStorage.getObj("projects"));
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [sidebarState, setSideBarState] = useState("opened");

  useEffect(() => {
    persistProjectsListData(contextData, userSignedIn);
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
        setUserSignedIn
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
