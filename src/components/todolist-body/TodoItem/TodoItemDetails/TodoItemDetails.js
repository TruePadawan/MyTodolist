import { useContext, useRef } from "react";
import TodoListContext from "../../../context/TodoListContext";
import Modal from "../../../modal/Modal";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { appManager } from "../../../../managers/appManager";
import { toLocalStorage } from "../../../../functions/projects";
import { DB_actions } from "../../../../functions/firebase_db";
import { InputField, TextArea } from "../../../Input/InputField";

import "./TodoItemDetails.css";
import { formatDistanceStrict } from "date-fns";

const TodoItemDetails = (props) => {
  const { projects, setProjects } = useContext(TodoListContext);
  const titleFieldRef = useRef();
  const descFieldRef = useRef();

  const activeProjectID = appManager.activeProjectID;
  const updateItemData = (e) => {
    e.preventDefault();
    const title = titleFieldRef.current.value;
    const desc = descFieldRef.current.value;

    if (!appManager.userSignedIn) {
      setProjects((projects) => {
        projects[activeProjectID].todos[props.itemID].title = title;
        projects[activeProjectID].todos[props.itemID].desc = desc;
        toLocalStorage(projects);
        return { ...projects };
      });
    } else {
      DB_actions.updateTodoItem(
        appManager.uid,
        appManager.activeProjectID,
        props.itemID,
        { title, desc }
      );
    }
    props.closeDialog();
  };

  const setItemStatus = () => {
    if (!appManager.userSignedIn) {
      setProjects((projects) => {
        let currentStatus = projects[activeProjectID].todos[props.itemID].done;
        projects[activeProjectID].todos[props.itemID].done = !currentStatus;
        toLocalStorage(projects);
        return { ...projects };
      });
    } else {
      let currentStatus =
        projects[appManager.activeProjectID].todos[props.itemID].done;
      DB_actions.updateTodoItem(
        appManager.uid,
        appManager.activeProjectID,
        props.itemID,
        { done: !currentStatus }
      );
    }

    props.closeDialog();
  };

  const deleteItem = () => {
    if (!appManager.userSignedIn) {
      setProjects((projects) => {
        delete projects[activeProjectID].todos[props.itemID];
        toLocalStorage(projects);
        return { ...projects };
      });
    } else {
      DB_actions.deleteTodoItem(
        appManager.uid,
        appManager.activeProjectID,
        props.itemID
      );
    }

    props.closeDialog();
  };

  const { from, to } = props.itemData.timeframe;
  const timeframe = formatDistanceStrict(new Date(to), new Date(from));
  const remainingTime = formatDistanceStrict(new Date(to), Date.now());
  
  return (
    <Modal close={props.closeDialog} className="itemDetails">
      <form className="itemDetailsForm" onSubmit={updateItemData}>
        <h3>Details</h3>
        <InputField
          type={"text"}
          label={"Title"}
          required
          autoFocus
          minLength="2"
          maxLength="100"
          defaultValue={props.itemData.title}
          inputRef={titleFieldRef}
        />

        <InputField
          type={"text"}
          label={"Timeframe (read-only)"}
          value={timeframe}
          readOnly
        />

        <InputField
          type={"text"}
          label={"Remaining Time (read-only)"}
          value={remainingTime}
          readOnly
        />

        <TextArea
          label={"Description"}
          required
          minLength="2"
          className="desc"
          defaultValue={props.itemData.desc}
          inputRef={descFieldRef}
        ></TextArea>

        <div className="btnGroup">
          <button className="saveBtn" type="submit">
            <SaveIcon /> Save
          </button>

          <button
            onClick={setItemStatus}
            className="setDoneOrNotDone"
            type="button"
          >
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
