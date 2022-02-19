import Modal from "../modal/Modal";

import styles from "./NewTaskDialog.module.css";

const NewTaskDialog = (props) => {
  return (
    <Modal className={styles["newTask"]} close={props.closeDialog}>
      <h3 style={{"textAlign": "center"}}>Add New Task</h3>
      <form>
        <input minLength="2" maxLength="50" placeholder="Title" required />
        <button className={styles["newTaskAddBtn"]}>Add</button>
      </form>
    </Modal>
  );
};

export default NewTaskDialog;
