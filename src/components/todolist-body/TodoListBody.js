import TodoItem from "./TodoItem/TodoItem";
import styles from "./TodoListBody.module.css";

const TodoListBody = ({ todos }) => {
  let todoList = [];
  for (const itemID in todos)
  {
    let itemTitle = todos[itemID].title;
    let itemDueDate = todos[itemID].dueDate;
    let itemDesc = todos[itemID].desc;
    let isItemDone = todos[itemID].done;

    todoList.push(
      <TodoItem id={itemID} key={itemID}
                title={itemTitle}
                dueDate={itemDueDate}
                desc={itemDesc}
                done={isItemDone} />
    );
  }

  return (
    <div className={styles["todolist-body"]}>
      <ul>{ todoList }</ul>
      <ul></ul>
    </div>
  );
};

export default TodoListBody;
