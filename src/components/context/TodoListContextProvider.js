import { useState } from "react";
import TodoListContext from "./TodoListContext";

const TodoListContextProvider = (props) => {
  const [contextData, setContextData] = useState({
    taskList: [
      {
        title: "Do something",
        status: false,
      },
    ],
  });

  const contextValue = { contextData, setContextData };

  return (
    <TodoListContext.Provider value={contextValue}>
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
