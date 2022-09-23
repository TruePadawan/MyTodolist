import TodoItem from "./TodoItem/TodoItem";
import styles from "./TodoListBody.module.css";

const TodoListBody = ({ todos }) => {
  let todoList = [];

  for (const itemID in todos) {
    const itemTitle = todos[itemID].title;
    const isItemDone = todos[itemID].done;
    todoList.push(
      <TodoItem id={itemID} key={itemID} title={itemTitle} done={isItemDone} />
    );
  }

  return (
    <div className={styles["todolist-body"]}>
      <ul>{todoList}</ul>
      <ul></ul>
    </div>
  );
};

export default TodoListBody;
