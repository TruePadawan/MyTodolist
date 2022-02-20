import { useContext } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TodoListContext from "../context/TodoListContext";
import Modal from "../modal/Modal";

import styles from "./NewTaskDialog.module.css";

const NewTaskDialog = (props) => {
  const { setContextData } = useContext(TodoListContext);

  /* Create a new list of existing tasks and update local storage along with context data state */
  function addNewTask(e) {
    e.preventDefault();

    setContextData((currentContextData) => {
      let newTaskTitle = document.getElementById("newTaskInput").value;

      let updatedContextData = {
        taskList: [
          ...currentContextData.taskList,
          {
            title: newTaskTitle,
            status: false,
          },
        ],
      };
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
