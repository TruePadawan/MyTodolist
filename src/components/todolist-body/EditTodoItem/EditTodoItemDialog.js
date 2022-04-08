import { useContext, useState } from "react";
import TodoListContext from "../../context/TodoListContext";
import Modal from "../../modal/Modal";

import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./EditTodoItemDialog.module.css";

const EditTodoItemDialog = (props) => {
  const [editItemInputValue, setEditItemInputValue] = useState(props.currentValue);

  const { contextData, setContextData, MainController } = useContext(TodoListContext);

  function updateItemTitle(e) {
    e.preventDefault();

    const newTitle = document.getElementById("editItemInput").value;
    
    if (!MainController.userLoggedIn)
    {
      const itemIndex = contextData.taskList.findIndex((item) => Object.keys(item)[0] === props.itemID);
      let currentTitle = contextData.taskList[itemIndex][props.itemID].title;
      
      /* Update item only if the new value isn't the same as the already-stored title for task item to be updated */
      if (currentTitle.trim() !== newTitle.trim()) {
        setContextData((currentContextData) => {
          if (itemIndex !== -1) {
            const item = currentContextData.taskList[itemIndex];
            item[props.itemID].title = newTitle;

            currentContextData.taskList[itemIndex] = item;
            const updatedContextValue = { taskList: currentContextData.taskList };

            window.localStorage.setObj("taskList", updatedContextValue.taskList);
            return updatedContextValue;
          }
          return currentContextData;
        });
      }
    }
    else {
      MainController.updateTodoItemInDB(props.itemID,{title: newTitle});
    }
    
    props.closeDialog();
  }

  function setItemCompleteOrNot(e) {
    e.preventDefault();
    
    if (!MainController.userLoggedIn)
    {
      setContextData((currentContextData) => {
        const itemIndex = currentContextData.taskList.findIndex((item) => Object.keys(item)[0] === props.itemID);

        if (itemIndex !== -1) {
          const item = currentContextData.taskList[itemIndex];
          item[props.itemID].complete = !item[props.itemID].complete;

          currentContextData.taskList[itemIndex] = item;
          let updatedContextValue = { taskList: currentContextData.taskList };
          window.localStorage.setObj("taskList", currentContextData.taskList);

          return updatedContextValue;
        }
        return currentContextData;
      });
    }
    else {
      MainController.updateTodoItemInDB(props.itemID, {
        complete: !props.isTaskComplete
      });
    }
    props.closeDialog();
  }

  function deleteTodoItem(e) {
    e.preventDefault();

    if (!MainController.userLoggedIn)
    {
      setContextData((currentContextData) => {
        const itemIndex = currentContextData.taskList.findIndex((item) => Object.keys(item)[0] === props.itemID);
        
        if (itemIndex !== -1) {
          currentContextData.taskList.splice(itemIndex, 1);

          const updatedContextValue = { taskList: currentContextData.taskList };

          window.localStorage.setObj("taskList", updatedContextValue.taskList);

          return updatedContextValue;
        }
        return currentContextData;
      });
    }
    else {
      MainController.deleteTodoItemFromDB(props.itemID);
    }

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
          <button onClick={updateItemTitle} className={styles["saveBtn"]}>
            <SaveIcon /> Save
          </button>

          <button onClick={setItemCompleteOrNot} className={styles["setDoneOrNotDone"]}>
            <DoneIcon /> Mark Done/Not Done
          </button>

          <button onClick={deleteTodoItem} className={styles["deleteBtn"]}>
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoItemDialog;
