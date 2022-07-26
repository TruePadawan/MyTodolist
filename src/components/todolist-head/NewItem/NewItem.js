import { useRef, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Modal from "../../modal/Modal";
import {InputField, TextArea} from "../../Input/InputField";

import { v4 as uuidv4 } from "uuid";
import { appManager } from "../../../managers/appManager";
import { toLocalStorage } from "../../../functions/projects";
import { DB_actions } from "../../../functions/firebase_db";

import "./NewItem.css";

const NewItem = (props) => {
  const titleRef = useRef();
  const dueDateRef = useRef();
  const descRef = useRef();
  const { setProjects } = useContext(TodoListContext);

  function addTodo(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const dueDate = dueDateRef.current.value;
    const desc = descRef.current.value;
    const done = false;

    const activeProjectID = appManager.activeProjectID;
    const item = {
      title,
      dueDate,
      desc,
      done,
    };

    if (!appManager.userSignedIn) {
      const itemID = uuidv4();
      setProjects((projects) => {
        if (activeProjectID in projects) {
          projects[activeProjectID].todos[itemID] = item;
          toLocalStorage(projects);
          return { ...projects };
        }
      });
    }
    else {
      DB_actions.addTodoItem(appManager.uid, activeProjectID, item);
    }
    props.closeDialog();
  }

  const getCurrentDate = () => {
    let currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() - currentDateTime.getTimezoneOffset());
    return currentDateTime.toISOString().slice(0, 16);
  }

  const currentDate = getCurrentDate();

  return (
    <Modal className="addTodo" close={props.closeDialog}>
      <form onSubmit={addTodo}>
        <h3>New Item</h3>
        <InputField
          ref={titleRef}
          label={"Title"}
          minLength="2"
          maxLength="100"
          placeholder="Review calculus in Math"
          autoFocus
          autoComplete="off"
          required
        />
        <InputField type="datetime-local" label={"From"} required value={currentDate} readOnly />
        <InputField type="datetime-local" ref={dueDateRef} min={currentDate} label={"To"} required />
        <TextArea
          label={"Description"}
          ref={descRef}
          placeholder="Review calculus in math before saturday"
          required
          className="desc"
          minLength="2" />
        <button className="addTodoBtn">
          <AddTaskIcon /> Add
        </button>
      </form>
    </Modal>
  );
};

export default NewItem;
