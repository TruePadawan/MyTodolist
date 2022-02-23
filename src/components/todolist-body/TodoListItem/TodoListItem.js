import { useState, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import EditTodoListItemDialog from "../EditTodoListItem/EditTodoListItemDialog";

import styles from "./TodoListItem.module.css";

const TodoListItem = (props) => {
  const { contextData, setContextData } = useContext(TodoListContext);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const itemIndex = contextData.taskList.findIndex(
    (item) => item.id === props.id
  );
  let isTaskDone = contextData.taskList[itemIndex].status;

  function changeTaskStatus() {
    setContextData((currentContextData) => {
      const itemIndex = currentContextData.taskList.findIndex(
        (item) => item.id === props.id
      );
      if (itemIndex !== -1) {
        const itemCurrentStatus = currentContextData.taskList[itemIndex].status;
        isTaskDone = !itemCurrentStatus;
        currentContextData.taskList[itemIndex].status = !itemCurrentStatus;
        let updatedContextValue = { taskList: currentContextData.taskList };
        window.localStorage.setObj("taskList", currentContextData.taskList);

        return updatedContextValue;
      }
      return currentContextData;
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
          itemID={props.id}
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
