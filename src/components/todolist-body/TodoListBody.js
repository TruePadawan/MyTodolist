import { useContext } from "react";
import TodoItem from "./TodoItem/TodoItem";
import TodoListContext from "../context/TodoListContext";
import styles from "./TodoListBody.module.css";

const TodoListBody = () => {
  const { contextData } = useContext(TodoListContext);

  let listOfTasks = contextData.taskList.map((item) => {
    let itemID = Object.keys(item)[0];
    return (
      <TodoItem
        id={itemID}
        key={`${item[itemID].title}${itemID}`}
        title={item[itemID].title}
        complete={item[itemID].complete}
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
