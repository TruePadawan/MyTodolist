import { useContext, useState } from "react";
import TodoListContext from "../../../context/TodoListContext";
import Modal from "../../../modal/Modal";

import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";

import "./TodoItemDetails.css";

const TodoItemDetails = (props) => {
  const [editItemInputValue, setEditItemInputValue] = useState(props.currentValue);

  const { projects, setProjects, MainController, userSignedIn } = useContext(TodoListContext);

  function updateItemTitle(e) {
    e.preventDefault();

    const newTitle = document.getElementById("editItemInput").value;
    
    if (!MainController.userLoggedIn)
    {
      const itemIndex = projects.taskList.findIndex((item) => Object.keys(item)[0] === props.itemID);
      let currentTitle = projects.taskList[itemIndex][props.itemID].title;
      
      /* Update item only if the new value isn't the same as the already-stored title for task item to be updated */
      if (currentTitle.trim() !== newTitle.trim()) {
        setProjects((currentprojects) => {
          if (itemIndex !== -1) {
            const item = currentprojects.taskList[itemIndex];
            item[props.itemID].title = newTitle;

            currentprojects.taskList[itemIndex] = item;
            const updatedContextValue = { taskList: currentprojects.taskList };

            window.localStorage.setObj("taskList", updatedContextValue.taskList);
            return updatedContextValue;
          }
          return currentprojects;
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
      setProjects((currentprojects) => {
        const itemIndex = currentprojects.taskList.findIndex((item) => Object.keys(item)[0] === props.itemID);

        if (itemIndex !== -1) {
          const item = currentprojects.taskList[itemIndex];
          item[props.itemID].complete = !item[props.itemID].complete;

          currentprojects.taskList[itemIndex] = item;
          let updatedContextValue = { taskList: currentprojects.taskList };
          window.localStorage.setObj("taskList", currentprojects.taskList);

          return updatedContextValue;
        }
        return currentprojects;
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
      setProjects((currentprojects) => {
        const itemIndex = currentprojects.taskList.findIndex((item) => Object.keys(item)[0] === props.itemID);
        
        if (itemIndex !== -1) {
          currentprojects.taskList.splice(itemIndex, 1);

          const updatedContextValue = { taskList: currentprojects.taskList };

          window.localStorage.setObj("taskList", updatedContextValue.taskList);

          return updatedContextValue;
        }
        return currentprojects;
      });
    }
    else {
      MainController.deleteTodoItemFromDB(props.itemID);
    }

    props.closeDialog();
  }

  return (
    <Modal close={props.closeDialog} className="itemDetails">
      <form className="itemDetailsForm">
        <h3>Details</h3>
        <input
          autoFocus
          minLength="2"
          maxLength="100"
          value={props.itemData.title} />
        <input type="date" value={props.itemData.dueDate} required />
        <textarea required minLength="2" className="desc" value={props.itemData.desc}></textarea>
        <div className="itemDetailsFormBtns">
          <button onClick={updateItemTitle} className="saveBtn">
            <SaveIcon /> Save
          </button>

          <button onClick={setItemCompleteOrNot} className="setDoneOrNotDone">
            <DoneIcon /> Mark Done/Not Done
          </button>

          <button onClick={deleteTodoItem} className="deleteBtn">
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoItemDetails;
