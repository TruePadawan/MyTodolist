import { useContext } from "react";
import TodoItem from "./TodoItem/TodoItem";
import TodoListContext from "../context/TodoListContext";
import styles from "./TodoListBody.module.css";

const TodoListBody = () => {
  const { contextData } = useContext(TodoListContext);

  let listOfTasks = contextData.taskList.map((task) => {
    return (
      <TodoItem
        id={task.id}
        key={`${task.title}${task.id}`}
        title={task.title}
        complete={task.complete}
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
