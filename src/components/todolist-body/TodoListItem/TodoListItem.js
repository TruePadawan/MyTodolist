import { useState, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import EditTodoListItemDialog from "../EditTodoListItem/EditTodoListItemDialog";

import styles from "./TodoListItem.module.css";

const TodoListItem = (props) => {
  const { contextData, setContextData } = useContext(TodoListContext);

  let isTaskDone = contextData.taskList[props.index].status;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function changeTaskStatus() {
    setContextData((currentContextData) => {
      const itemCurrentStatus = currentContextData.taskList[props.index].status;
      currentContextData.taskList[props.index].status = !itemCurrentStatus;
      isTaskDone = !itemCurrentStatus;
      return { taskList: currentContextData.taskList };
    });
  }

  console.log(`up: ${props.index}`);

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
          itemIndex={props.index}
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

export default TodoListItem;
