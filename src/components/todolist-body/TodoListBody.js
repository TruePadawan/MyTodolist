import { useState, useContext } from "react";
import EditTodoListItemDialog from "./EditTodoListItem/EditTodoListItemDialog";
import TodoListContext from "../context/TodoListContext";
import styles from "./TodoListBody.module.css";

const TodoListItem = (props) => {
  const [isTaskDone, setIsTaskDone] = useState(props.status);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function changeTaskStatus() {
    setIsTaskDone((current) => !current);
  }

  function openEditDialog() {
    setIsEditDialogOpen(true);
  }

  function closeEditDialog() {
    setIsEditDialogOpen(false);
  }

  return (
    <>
      {isEditDialogOpen && (
        <EditTodoListItemDialog
          closeDialog={closeEditDialog}
          currentValue={props.title}
        />
      )}

      <li
        className={`${styles["todolist-item"]} ${
          styles[isTaskDone ? "task_done" : ""]
        }`}
      >
        <p onClick={changeTaskStatus}>{props.title}</p>
        <button onClick={openEditDialog}>Edit</button>
      </li>
    </>
  );
};

const TodoListBody = () => {
  const { contextData } = useContext(TodoListContext);

  let listOfTasks = (
    <ul>
      {contextData.taskList.map((task) => (
        <TodoListItem
          key={task.title}
          title={task.title}
          status={task.status}
        />
      ))}
    </ul>
  );

  return <div className={styles["todolist-body"]}>{listOfTasks}</div>;
};

export default TodoListBody;
