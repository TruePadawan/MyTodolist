import { useContext, useState } from "react";

import TodoListContext from "../../context/TodoListContext";
import Modal from "../../modal/Modal";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./EditTodoListItemDialog.module.css";

const EditTodoListItemDialog = (props) => {
  const [editItemInputValue, setEditItemInputValue] = useState(
    props.currentValue
  );

  const { contextData, setContextData } = useContext(TodoListContext);

  function saveEditedTask(e) {
    e.preventDefault();

    const editItemInput = document.getElementById("editItemInput");
    let currentItem = contextData.taskList[props.itemIndex];

    /* Update context value only if the value in editItemInput isn't the same as the already-stored title for task item to be updated */
    if (currentItem.title.trim() !== editItemInput.value.trim()) {
      setContextData((currentContextData) => {
        currentContextData.taskList[props.itemIndex].title =
          editItemInput.value;

        const updatedContextValue = {
          taskList: currentContextData.taskList,
        };

        return updatedContextValue;
      });
    }

    props.closeDialog();
  }

  function deleteTask(e) {
    e.preventDefault();

    setContextData((currentContextData) => {
      currentContextData.taskList.splice(props.itemIndex, 1);

      const updatedContextValue = {
        taskList: currentContextData.taskList,
      };

      return updatedContextValue;
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
          <button onClick={saveEditedTask}>
            <CheckIcon /> Save
          </button>
          <button onClick={deleteTask}>
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoListItemDialog;
