import { createContext } from "react";

const TodoListContext = createContext({
  projects: {},
  setProjects: () => {},
  noProjects: undefined,
  scheduleNotification: () => {},
});

export default TodoListContext;
