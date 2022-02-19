import Modal from "../../modal/Modal";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./EditTodoListItemDialog.module.css";

const EditTodoListItemDialog = (props) => {
  function saveEditedTask(e) {
    e.preventDefault();
    props.closeDialog();
  }

  function deletedTask(e) {
    e.preventDefault();
    props.closeDialog();
  }

  return (
    <Modal close={props.closeDialog} className={styles["editItem"]}>
      <h3 style={{ textAlign: "center" }}>Edit Item</h3>
      <form className={styles["editItemBody"]}>
        <input
          autoFocus
          minLength="2"
          maxLength="100"
          value={props.currentValue}
        />
        <div className={styles["editItemBtns"]}>
          <button onClick={saveEditedTask}>
            <CheckIcon /> Save
          </button>
          <button onClick={deletedTask}>
            <DeleteIcon /> Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoListItemDialog;
