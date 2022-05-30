import { useState, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import EditTodoItemDialog from "../EditTodoItem/EditTodoItemDialog";

import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const { contextData } = useContext(TodoListContext);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const itemIndex = contextData.taskList.findIndex(
    (item) => Object.keys(item)[0] === props.id
  );

  let isTaskDone = contextData.taskList[itemIndex][props.id].complete;

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
          isTaskComplete={isTaskDone}
        />
      )}

      <li
        className={`${styles["todolist-item"]} ${
          styles[isTaskDone ? "task_done" : ""]
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
