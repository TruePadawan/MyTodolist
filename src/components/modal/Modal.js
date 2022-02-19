import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.closeModal} className={styles["backdrop"]}></div>;
};

const ModalBody = (props) => {
  return <div className={styles["modal-body"]}>{props.passChild}</div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.close} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalBody closeModal={props.close} passChild={props.children} />,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
