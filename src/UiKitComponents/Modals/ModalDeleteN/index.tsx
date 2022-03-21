import React from 'react';
import { Modal } from 'rsuite';
import { Button } from '@UiKitComponents';
import './ModalDelete.scss';

interface ModalDeleteProps {
  name: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  deleteAction: () => void;
}

const ModalDelete = (props: ModalDeleteProps) => {
  const { name, open, setOpen, deleteAction } = props;

  const onClose = () => {
    setOpen(!open);
  };

  return (
    <div className="modal-container">
      <Modal open={open} onClose={onClose} dialogClassName="modal_delete">
        <Modal.Header>
          <h6>Delete {name}</h6>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you really want to delete the <span>{name}</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteAction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDelete;
