import { Fragment } from "react";
import ReactDOM from "react-dom";

import { Props } from "../../types/types";
import styles from "./Modal.module.css";

type BackdropType = {
  onClose: () => void;
};

type ModalType = {
  onClose: () => void;
  children: React.ReactNode;
};

const Backdrop: React.FC<BackdropType> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<Props> = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

// This is the div with id="overlays" in public/index.html
const portalElement = document.getElementById("overlays");

const Modal: React.FC<ModalType> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
};

export default Modal;
