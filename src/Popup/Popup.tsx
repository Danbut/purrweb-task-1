import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface PopupProps {
  show: boolean;
  onHide: () => void;
}

export const Popup: React.FC<PopupProps> = (props) => {
  const [text, setText] = useState<string>('');

  const saveAuthorName = () => {
    const storage = window.localStorage;
    storage.setItem('author', text);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onSubmit={saveAuthorName}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Please, enter your name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={({ target: { value } }) => setText(value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={saveAuthorName}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
