import { useState, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import EditTodoListItemDialog from "../EditTodoListItem/EditTodoListItemDialog";

import styles from "./TodoListItem.module.css";

const TodoListItem = (props) => {
  const { contextData } = useContext(TodoListContext);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const itemIndex = contextData.taskList.findIndex(
    (item) => item.id === props.id
  );
  let isTaskDone = contextData.taskList[itemIndex].complete;

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
          itemID={props.id}
        />
      )}

      <li
        className={`${styles["todolist-item"]} ${styles[isTaskDone ? "task_done" : ""]}`}>
        <p>{props.title}</p>
        <button onClick={openEditDialog}>Edit</button>
      </li>
    </>
  );
};

export default TodoListItem;
