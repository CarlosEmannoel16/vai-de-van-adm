import { useState } from "react";
import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";

export const ModalTripStop = ({ nameButton }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <ButtonToolbar style={{ marginLeft: 10 }}>
        <Button onClick={handleOpen}> {nameButton}</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal {nameButton}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Salvar
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
