import { useContext } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TodoListContext from "../context/TodoListContext";
import Modal from "../modal/Modal";

import styles from "./NewTaskDialog.module.css";

function generateID(itemTitle) {
  return `${Date.now()} ${itemTitle.at(-1)}`;
}

const NewTaskDialog = (props) => {
  const { setContextData } = useContext(TodoListContext);

  /* Create a new list of existing tasks and update local storage along with context data state */
  function addNewTask(e) {
    e.preventDefault();
    setContextData((currentContextValue) => {
      let newTaskTitle = document.getElementById("newTaskInput").value;
      const itemID = generateID(newTaskTitle);

      let updatedTaskList = [
        ...currentContextValue.taskList,
        {
          id: itemID,
          title: newTaskTitle,
          status: false,
        },
      ];
      let updatedContextData = { taskList: updatedTaskList };
      window.localStorage.setObj("taskList", updatedContextData.taskList);

      return updatedContextData;
    });

    props.closeDialog();
  }

  return (
    <Modal className={styles["newTask"]} close={props.closeDialog}>
      <h3 style={{ textAlign: "center" }}>Add New Task</h3>
      <form onSubmit={addNewTask}>
        <input
          id="newTaskInput"
          minLength="2"
          maxLength="100"
          placeholder="Title"
          autoFocus
          required
        />
        <button className={styles["newTaskAddBtn"]}>
          <AddTaskIcon /> Add
        </button>
      </form>
    </Modal>
  );
};

export default NewTaskDialog;
