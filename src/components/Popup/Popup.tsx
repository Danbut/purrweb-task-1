import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../state/hooks";
import { saveName } from "../../state/name/nameSlice";

interface EnterNamePopupProps {
  show: boolean;
  onHide: () => void;
}

const EnterNamePopup: React.FC<EnterNamePopupProps> = (props) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const saveAuthorName = () => {
    dispatch(saveName(text));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Please, enter your name
        </Modal.Title>
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
        <Button variant="primary" onClick={saveAuthorName}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnterNamePopup;
