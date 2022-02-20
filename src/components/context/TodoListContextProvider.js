import { useState } from "react";
import TodoListContext from "./TodoListContext";

const TodoListContextProvider = (props) => {
  const [contextData, setContextData] = useState({
    taskList: window.localStorage.getObj("taskList"),
  });

  return (
    <TodoListContext.Provider value={{ contextData, setContextData }}>
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
