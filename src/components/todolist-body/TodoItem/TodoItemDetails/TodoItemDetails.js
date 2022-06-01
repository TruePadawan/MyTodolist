import { useContext, useRef } from "react";
import TodoListContext from "../../../context/TodoListContext";
import Modal from "../../../modal/Modal";
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
import { appManager } from "../../../../managers/appManager";

import "./TodoItemDetails.css";

const TodoItemDetails = (props) => {
  const { setProjects } = useContext(TodoListContext);
  const titleFieldRef = useRef();
  const dueDateFieldRef = useRef();
  const descFieldRef = useRef();
  
  const activeProjectID = appManager.activeProjectID;
  function updateItemData(e)
  {
    e.preventDefault();
    const title = titleFieldRef.current.value;
    const dueDate = dueDateFieldRef.current.value;
    const desc = descFieldRef.current.value;

    setProjects((projects) => {
      projects[activeProjectID].todos[props.itemID].title = title;
      projects[activeProjectID].todos[props.itemID].dueDate = dueDate;
      projects[activeProjectID].todos[props.itemID].desc = desc;

      return { ...projects };
    });

    props.closeDialog();
  }

  function setItemStatus()
  {
    setProjects((projects) => {
      let currentStatus = projects[activeProjectID].todos[props.itemID].done;
      projects[activeProjectID].todos[props.itemID].done = !currentStatus;
      return { ...projects }
    });

    props.closeDialog();
  }

  function deleteItem()
  {
    setProjects((projects) => {
      delete projects[activeProjectID].todos[props.itemID];
      return { ...projects };
    });
    props.closeDialog();
  }

  return (
    <Modal close={props.closeDialog} className="itemDetails">
      <form className="itemDetailsForm" onSubmit={updateItemData}>
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

          <button onClick={setItemStatus} className="setDoneOrNotDone" type="button">
            <DoneIcon /> Mark Done/Not Done
          </button>

          <button onClick={deleteItem} className="deleteBtn" type="button">
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoItemDetails;
