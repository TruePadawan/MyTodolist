import { useState } from "react";
import EditTodoItemDialog from "../EditTodoItem/EditTodoItemDialog";

import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function openEditDialog() {
    setIsEditDialogOpen(true);
  }

  function closeEditDialog() {
    setIsEditDialogOpen(false);
  }

  return (
    <>
      {isEditDialogOpen && (
        <EditTodoItemDialog
          closeDialog={closeEditDialog}
          currentValue={props.title}
          itemID={props.id}
          isTaskComplete={props.done}
        />
      )}

      <li
        className={`${styles["todolist-item"]} ${
          styles[props.done ? "task_done" : ""]
        }`}
      >
        <p>{props.title}</p>
        <button onClick={openEditDialog} type="button">
          Edit
        </button>
      </li>
    </>
  );
};

export default TodoItem;
