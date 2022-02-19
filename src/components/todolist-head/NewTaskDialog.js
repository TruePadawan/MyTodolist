import Modal from "../modal/Modal";

import "./NewTaskDialog.module.css";

const NewTaskDialog = (props) => {
  return (
    <Modal close={props.closeDialog}>
      <h2>Add New Task</h2>
      <div className="newTask">
        <input minLength="2" maxLength="50" />
        <button className="newTaskAddBtn">Add</button>
      </div>
    </Modal>
  );
};

export default NewTaskDialog;
