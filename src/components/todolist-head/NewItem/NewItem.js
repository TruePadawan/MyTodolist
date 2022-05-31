import { useContext } from "react";

import AddTaskIcon from "@mui/icons-material/AddTask";
import TodoListContext from "../../context/TodoListContext";
import Modal from "../../modal/Modal";

import styles from "./NewItem.module.css";




const NewItem = (props) => {
  const { setContextData, MainController } = useContext(TodoListContext);

  /* Create a new list of existing tasks and update local storage along with context data state */
  // function addNewTask(e) {
  //   e.preventDefault();

  //   let taskTitle_trimmed = document.getElementById("newTaskInput").value.trim();
  //   if (taskTitle_trimmed.length < 2) {
  //     return;
  //   }

  //   if (!MainController.userLoggedIn)
  //   {
  //     const newTaskItem = MainController.newTaskItem_Local(taskTitle_trimmed);

  //     setContextData((currentContextValue) => {
  //       let updatedTasksList = [...currentContextValue.taskList, newTaskItem];
  //       let updatedContextData = { taskList: updatedTasksList };

  //       window.localStorage.setObj("taskList", updatedContextData.taskList);
  //       return updatedContextData;
  //     });
  //   }
  //   else {
  //     MainController.newTaskItem_Database(taskTitle_trimmed);
  //   }
    
  //   props.closeDialog();
  // }
  function addTodo(e)
  {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
  }


  return (
    <Modal className={styles["addTodo"]} close={props.closeDialog}>
      <h3>New Item</h3>
      <form onSubmit={addTodo}>
        <input
          id="title"
          minLength="2"
          maxLength="100"
          placeholder="Review calculus in Math"
          autoFocus
          autoComplete="off"
          required
        />
        <input type="date" required className="dueDate" />
        <textarea
          placeholder="Review calculus in math before saturday"
          required
          className={styles["desc"]}
          minlength="2"
        ></textarea>
        <button className={styles["addTodoBtn"]}>
          <AddTaskIcon /> Add
        </button>
      </form>
    </Modal>
  );
};

export default NewItem;
