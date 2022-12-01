import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
  return <div onClick={props.closeModal} className="backdrop"></div>;
};

const ModalBody = (props) => {
  return <div className={`modal-body ${props.classes}`}>{props.passChild}</div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.close} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalBody
          closeModal={props.close}
          passChild={props.children}
          classes={props.className}
        />,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
