import { useState, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import TodoItemDetails from "./TodoItemDetails/TodoItemDetails";
import { appManager } from "../../../managers/appManager";

import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { projects } = useContext(TodoListContext);

  function openEditDialog() {
    setOpenDetailsDialog(true);
  }

  function closeEditDialog() {
    setOpenDetailsDialog(false);
  }

  const activeProjectID = appManager.activeProjectID;
  let componentClassName = `${styles["todolist-item"]} ${styles[props.done ? "task_done" : ""]}`;
  let data = projects[activeProjectID].todos[props.id];
  
  return (
    <>
      {openDetailsDialog && (
        <TodoItemDetails
          closeDialog={closeEditDialog}
          itemData={data}
          itemID={props.id}
          taskDone={props.done}
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
