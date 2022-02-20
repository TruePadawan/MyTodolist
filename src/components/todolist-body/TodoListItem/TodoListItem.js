import { useState, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import EditTodoListItemDialog from "../EditTodoListItem/EditTodoListItemDialog";

import styles from "./TodoListItem.module.css";

const TodoListItem = (props) => {
  const { contextData, setContextData } = useContext(TodoListContext);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  let isTaskDone = contextData.taskList[props.index].status;
  console.log(props.index);

  function changeTaskStatus() {
    setContextData((currentContextData) => {
      const itemCurrentStatus = currentContextData.taskList[props.index].status;
      currentContextData.taskList[props.index].status = !itemCurrentStatus;

      window.localStorage.setObj("taskList", currentContextData.taskList);

      isTaskDone = !itemCurrentStatus;
      return { taskList: currentContextData.taskList };
    });
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
