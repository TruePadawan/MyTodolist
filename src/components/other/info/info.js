import Modal from "../modal/Modal";
import "./info.css";

const Info = ({ message }) => {
  return (
    <Modal className="info">
      <span>{message}</span>
    </Modal>
  );
};

export default Info;
