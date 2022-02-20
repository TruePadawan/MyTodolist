import { useContext } from "react";
import TodoListItem from "./TodoListItem/TodoListItem";
import TodoListContext from "../context/TodoListContext";
import styles from "./TodoListBody.module.css";

const TodoListBody = () => {
  const { contextData } = useContext(TodoListContext);

  let listOfTasks = contextData.taskList.map((task) => (
    <TodoListItem
      index={task.index}
      key={`${task.title}${task.index}`}
      title={task.title}
      status={task.status}
    />
  ));

  return (
    <div className={styles["todolist-body"]}>
      <ul>{listOfTasks}</ul>
    </div>
  );
};

export default TodoListBody;
