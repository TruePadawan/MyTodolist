import { useContext, useMemo } from "react";
import TodoListItem from "./TodoListItem/TodoListItem";
import TodoListContext from "../context/TodoListContext";
import styles from "./TodoListBody.module.css";

const TodoListBody = () => {
  const { contextData } = useContext(TodoListContext);

  let listOfTasks = contextData.taskList.map((task) => {
    let index = contextData.taskList.findIndex(
      (item) => item.title === task.title
    );

  // const itemID = useMemo(() => ,[])
    return (
      <TodoListItem
        index={index}
        id={task.id}
        key={`${task.title}${task.id}`}
        title={task.title}
        status={task.status}
      />
    );
  });

  return (
    <div className={styles["todolist-body"]}>
      <ul>{listOfTasks}</ul>
    </div>
  );
};

export default TodoListBody;
