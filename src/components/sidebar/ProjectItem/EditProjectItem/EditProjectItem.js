import { useRef } from "react";
import Modal from "../../../modal/Modal";
import { InputField } from "../../../Input/InputField";
import "./EditProjectItem.css";

const EditProjectItem = (props) => {
  const titleRef = useRef();

  function modifyItem(e) {
    e.preventDefault();

    const btn = e.nativeEvent.submitter.className;
    if (btn === "saveBtn") {
      props.updateTitle(titleRef.current.value);
    } else {
      props.deleteItem();
    }
    props.close();
  }

  return (
    <Modal className="editProjectItem" close={props.close}>
      <form onSubmit={modifyItem}>
        <h3>Edit Project</h3>
        <InputField
          inputRef={titleRef}
          type="text"
          minLength="2"
          maxLength="25"
          defaultValue={props.title}
        />
        <div className="btnGroup">
          <button type="submit" className="saveBtn">
            Save
          </button>
          <button type="submit" className="deleteBtn">
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProjectItem;
