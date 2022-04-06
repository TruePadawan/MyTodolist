import { useState } from "react";
import TodoListContext from "./TodoListContext";
import { MainController } from "../../controller/controller";

const TodoListContextProvider = (props) => {
  const [contextData, setContextData] = useState({taskList: window.localStorage.getObj("taskList"),});

  return (
    <TodoListContext.Provider value={{ contextData, setContextData, MainController }}>
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
