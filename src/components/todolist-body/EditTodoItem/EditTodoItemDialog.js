import { useContext, useState } from "react";
import TodoListContext from "../../context/TodoListContext";
import Modal from "../../modal/Modal";
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./EditTodoItemDialog.module.css";

const EditTodoItemDialog = (props) => {
  const [editItemInputValue, setEditItemInputValue] = useState(props.currentValue);

  const { contextData, setContextData } = useContext(TodoListContext);

  function updateTodoListItem(e) {
    e.preventDefault();
    const updatedItemTitle = document.getElementById("editItemInput").value;
    const itemIndex = contextData.taskList.findIndex((item) => item.id === props.itemID);
    let currentItem = contextData.taskList[itemIndex];

    /* Update context value only if the new value isn't the same as the already-stored title for task item to be updated */
    if (currentItem.title.trim() !== updatedItemTitle.trim()) {
      setContextData((currentContextData) => {
        if (itemIndex !== -1) {
          currentContextData.taskList[itemIndex].title = updatedItemTitle;
          const updatedContextValue = { taskList: currentContextData.taskList };
          window.localStorage.setObj("taskList", updatedContextValue.taskList);

          return updatedContextValue;
        }
        return currentContextData;
      });
    }
    props.closeDialog();
  }

  function setTaskDoneOrNotDone(e) {
    e.preventDefault();
    setContextData((currentContextData) => {
      const itemIndex = currentContextData.taskList.findIndex(
        (item) => item.id === props.itemID
      );

      if (itemIndex !== -1) {
        const itemCurrentStatus = currentContextData.taskList[itemIndex].complete;
        currentContextData.taskList[itemIndex].complete = !itemCurrentStatus;
        let updatedContextValue = { taskList: currentContextData.taskList };
        window.localStorage.setObj("taskList", currentContextData.taskList);

        return updatedContextValue;
      }
      return currentContextData;
    });
    props.closeDialog();
  }

  /* Delete task item from list of tasks and update contextData state along with localStorage */
  function deleteTodoListItem(e) {
    e.preventDefault();

    setContextData((currentContextData) => {
      const itemIndex = currentContextData.taskList.findIndex((item) => item.id === props.itemID);
      
      if (itemIndex !== -1) {
        currentContextData.taskList.splice(itemIndex, 1);

        const updatedContextValue = { taskList: currentContextData.taskList };

        window.localStorage.setObj("taskList", updatedContextValue.taskList);

        return updatedContextValue;
      }
      return currentContextData;
    });
    props.closeDialog();
  }

  return (
    <Modal close={props.closeDialog} className={styles["editItem"]}>
      <h3 style={{ textAlign: "center" }}>Edit Item</h3>
      <form className={styles["editItemBody"]}>
        <input
          id="editItemInput"
          autoFocus
          minLength="2"
          maxLength="100"
          value={editItemInputValue}
          onChange={(e) => setEditItemInputValue(e.target.value)}
        />
        <div className={styles["editItemBtns"]}>
          <button onClick={updateTodoListItem} className={styles["saveBtn"]}>
            <SaveIcon /> Save
          </button>

          <button onClick={setTaskDoneOrNotDone} className={styles["setDoneOrNotDone"]}>
            <DoneIcon /> Mark Done/Not Done
          </button>

          <button onClick={deleteTodoListItem} className={styles["deleteBtn"]}>
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoItemDialog;
