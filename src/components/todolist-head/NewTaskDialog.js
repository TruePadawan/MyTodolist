import { useContext } from "react";

import AddTaskIcon from "@mui/icons-material/AddTask";
import TodoListContext from "../context/TodoListContext";
import Modal from "../modal/Modal";

import styles from "./NewTaskDialog.module.css";

const NewTaskDialog = (props) => {
  const { setContextData, MainController } = useContext(TodoListContext);

  /* Create a new list of existing tasks and update local storage along with context data state */
  function addNewTask(e) {
    e.preventDefault();

    let taskTitle_trimmed = document.getElementById("newTaskInput").value.trim();
    if (taskTitle_trimmed.length < 2) {
      return;
    }

    if (MainController._userLogged === true)
    {
      const newTaskItem = MainController.newTaskItem_Local(taskTitle_trimmed);

      setContextData((currentContextValue) => {
        let updatedTasksList = [...currentContextValue.taskList, newTaskItem];
        let updatedContextData = { taskList: updatedTasksList };

        window.localStorage.setObj("taskList", updatedContextData.taskList);
        return updatedContextData;
      });
    }
    else {
      MainController.newTaskItem_Database(taskTitle_trimmed);
    }
    
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
          autoComplete="off"
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
