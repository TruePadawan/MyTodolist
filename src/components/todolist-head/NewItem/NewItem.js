import { useRef, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import { appManager } from "../../../managers/appManager";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Modal from "../../modal/Modal";

import "./NewItem.css";

const NewItem = (props) => {
  const titleRef = useRef();
  const dueDateRef = useRef();
  const descRef = useRef();
  const { projects, setProjects, createDefaultProject } = useContext(TodoListContext);

  function addTodo(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const dueDate = dueDateRef.current.value;
    const desc = descRef.current.value;
    const done = false;

    const itemData = {
      title,
      dueDate,
      desc,
      done,
    };
    const activeProjectID = appManager.activeProjectID;

    try {
      if (activeProjectID === null)
      {
        throw new Error("No Projects, Creating Default Project...");
      }

      if (!appManager.userSignedIn) {
        const item = appManager.addTodoItem(false, itemData);
        const itemID = item.id;

        setProjects((projects) => {
          try {
            if (activeProjectID in projects) {
              projects[activeProjectID].todos[itemID] = item;
              return { ...projects };
            }
            throw new Error(`Project with ID ${activeProjectID} not found`);
          }
          catch (error) {
            alert(error.message);
          }
        });

      }
      else {
        appManager.addTodoItem(true, itemData, activeProjectID);
      }
    }
    catch (error) {
      alert(error.message);

      if (Object.keys(projects).length === 0)
      {
        // IF THERE IS NO PROJECT, CREATE A DEFAULT ONE
        createDefaultProject();
      }
    }

    props.closeDialog();
  }

  return (
    <Modal className="addTodo" close={props.closeDialog}>
      <form onSubmit={addTodo}>
        <h3>New Item</h3>
        <input
          ref={titleRef}
          minLength="2"
          maxLength="100"
          placeholder="Review calculus in Math"
          autoFocus
          autoComplete="off"
          required
        />
        <input type="date" required ref={dueDateRef} />
        <textarea
          ref={descRef}
          placeholder="Review calculus in math before saturday"
          required
          className="desc"
          minLength="2"
        ></textarea>
        <button className="addTodoBtn">
          <AddTaskIcon /> Add
        </button>
      </form>
    </Modal>
  );
};

export default NewItem;
