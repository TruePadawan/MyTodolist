import { useContext, useState, useRef } from "react";
import TodoListContext from "../../../context/TodoListContext";
import Modal from "../../../modal/Modal";

import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";

import "./TodoItemDetails.css";

const TodoItemDetails = (props) => {
  const titleFieldRef = useRef();
  const dueDateFieldRef = useRef();
  const descFieldRef = useRef();

  const { projects, setProjects, MainController, userSignedIn } = useContext(TodoListContext);

  function updateItemTitle(e) {
    e.preventDefault();

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
          required
          autoFocus
          minLength="2"
          maxLength="100"
          defaultValue={props.itemData.title}
          ref={titleFieldRef} />
        <input required type="date" defaultValue={props.itemData.dueDate} ref={dueDateFieldRef} />
        <textarea
          required
          minLength="2"
          className="desc"
          defaultValue={props.itemData.desc}
          ref={descFieldRef}>
        </textarea>
        <div className="itemDetailsFormBtns">
          <button className="saveBtn" type="submit">
            <SaveIcon /> Save
          </button>

          <button onClick={setItemCompleteOrNot} className="setDoneOrNotDone" type="button">
            <DoneIcon /> Mark Done/Not Done
          </button>

          <button onClick={deleteTodoItem} className="deleteBtn" type="button">
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoItemDetails;
