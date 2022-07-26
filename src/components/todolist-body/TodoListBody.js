import { differenceInMilliseconds, compareAsc } from "date-fns";
import { useContext } from "react";
import TodoListContext from "../context/TodoListContext";
import TodoItem from "./TodoItem/TodoItem";
import styles from "./TodoListBody.module.css";

const TodoListBody = ({ todos }) => {
  const { scheduleNotification } = useContext(TodoListContext);
  let todoList = [];
  let isThereUncompletedTodo = false;

  for (const itemID in todos) {
    const itemTitle = todos[itemID].title;
    const isItemDone = todos[itemID].done;
    const timeframe = todos[itemID].timeframe;
    todoList.push(
      <TodoItem id={itemID} key={itemID} title={itemTitle} done={isItemDone} />
    );

    // DONT SCHEDULE A NOTIFICATION IF THE TIMEFRAME HAS ELAPSED
    if (compareAsc(Date.now(), new Date(timeframe.to)) === -1) {
      const timeout = differenceInMilliseconds(
        new Date(timeframe.to),
        new Date(timeframe.from)
      );
      scheduleNotification(
        {
          id: itemID,
          title: itemTitle,
          body: "Have you done this?",
        },
        timeout
      );
    } else {
      isThereUncompletedTodo = true;
    }

    if (isThereUncompletedTodo)
    {
      scheduleNotification({
        title: "MyTodoList",
        body: "You have uncompleted todos"
      }, 1000);
    }
  }

  return (
    <div className={styles["todolist-body"]}>
      <ul>{todoList}</ul>
      <ul></ul>
    </div>
  );
};

export default TodoListBody;
