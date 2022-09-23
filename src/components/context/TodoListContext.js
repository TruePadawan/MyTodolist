import { createContext } from "react";

const TodoListContext = createContext({
  projects: {},
  setProjects: () => {},
  noProjects: undefined,
});

export default TodoListContext;
