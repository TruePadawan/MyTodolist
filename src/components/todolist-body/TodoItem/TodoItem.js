import { useState } from "react";
import TodoItemDetails from "./TodoItemDetails/TodoItemDetails";

import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function openEditDialog() {
    setOpenDetailsDialog(true);
  }

  function closeEditDialog() {
    setOpenDetailsDialog(false);
  }

  let componentClassName = `${styles["todolist-item"]} ${styles[props.done ? "task_done" : ""]}`;

  return (
    <>
      {openDetailsDialog && (
        <TodoItemDetails
          closeDialog={closeEditDialog}
          currentValue={props.title}
          itemID={props.id}
          isTaskComplete={props.done}
        />
      )}

      <li className={componentClassName}>
        <p>{props.title}</p>
        <button onClick={openEditDialog} type="button">Edit</button>
      </li>
    </>
  );
};

export default TodoItem;
