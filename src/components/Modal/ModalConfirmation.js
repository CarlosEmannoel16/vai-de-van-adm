import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalConfirmation({ open, setOpen, text, title, action }) {
  const toggle = () => setOpen(!open);

  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{text}</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              action();
            }}
            on
          >
            Sim
          </Button>
          <Button color="secondary" onClick={toggle}>
            Nao
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalConfirmation;
