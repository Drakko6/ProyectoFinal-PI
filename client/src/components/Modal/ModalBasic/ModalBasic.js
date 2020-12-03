import React from "react";
import "./ModalBasic.scss";
import { Modal } from "semantic-ui-react";

export default function ModalBasic({ show, setShow, title, children }) {
  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal size="mini" open={show} onClose={onClose} className="modal-basic">
        {title && <Modal.Header> {title}</Modal.Header>}
        {children}
      </Modal>
    </div>
  );
}
