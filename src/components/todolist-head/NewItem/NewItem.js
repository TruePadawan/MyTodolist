import { useRef, useContext } from "react";
import TodoListContext from "../../context/TodoListContext";
import { todoManager } from "../../../managers/todoManager";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Modal from "../../modal/Modal";

import "./NewItem.css";

const NewItem = (props) => {
  const titleRef = useRef();
  const dueDateRef = useRef();
  const descRef = useRef();
  const { userSignedIn, activeProjectID, setContextData } = useContext(TodoListContext);

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

    if (!userSignedIn) {
      const item = todoManager.addTodoItem(false, itemData);
      const itemID = item.id;

      setContextData((projects) => {
        try {
          if (activeProjectID === null) throw new Error("No Projects");
          if (activeProjectID in projects) {
            projects[activeProjectID].todos[itemID] = item;
            return { ...projects };
          }
          throw new Error(`Project with ID ${activeProjectID} not found`);
        }
        catch (error) {
          alert(error);
        }
      });
    }
    else {
      todoManager.addTodoItem(true, itemData);
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
