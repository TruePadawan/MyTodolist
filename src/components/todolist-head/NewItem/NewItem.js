import { useRef, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Modal from "../../modal/Modal";
import {InputField, TextArea} from "../../Input/InputField";

import { v4 as uuidv4 } from "uuid";
import { appManager } from "../../../managers/appManager";
import { toLocalStorage } from "../../../functions/projects";
import { DB_actions } from "../../../functions/firebase_db";
import { formatDistanceStrict } from "date-fns";

import "./NewItem.css";

const NewItem = (props) => {
  const timeframe = useRef();
  const titleRef = useRef();
  const timeframeFromRef = useRef();
  const timeframeToRef = useRef();
  const descRef = useRef();
  const { setProjects } = useContext(TodoListContext);

  const addTodoItem = (e) => {
    e.preventDefault();

    const itemTitle = titleRef.current.value;
    const itemTimeframe = {
      from: timeframeFromRef.current.value,
      to: timeframeToRef.current.value
    };
    const itemDescription = descRef.current.value;

    const activeProjectID = appManager.activeProjectID;
    const item = {
      title: itemTitle,
      timeframe: itemTimeframe,
      desc: itemDescription,
      done: false,
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
  const updateTimeframe = () => {
    const start = new Date(timeframeFromRef.current.value);
    const end = new Date(timeframeToRef.current.value);
    timeframe.current.value = formatDistanceStrict(end, start);
  }

  return (
    <Modal className="addTodo" close={props.closeDialog}>
      <form onSubmit={addTodoItem}>
        <h3>New Item</h3>
        <InputField
          inputRef={titleRef}
          label={"Title"}
          minLength="2"
          maxLength="100"
          placeholder="Review calculus in Math"
          autoFocus
          autoComplete="off"
          required
        />
        <InputField type="datetime-local" inputRef={timeframeFromRef} label={"From (read-only)"} required value={currentDate} readOnly />
        <InputField type="datetime-local" inputRef={timeframeToRef} min={currentDate} label={"To"} required onChange={updateTimeframe} />
        <InputField type="text" label={"Timeframe (read-only)"} inputRef={timeframe} readOnly />
        <TextArea
          label={"Description"}
          inputRef={descRef}
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
