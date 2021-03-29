import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useColumns } from "../../context/ColumnsContext";
import { CommentsProvider } from "../../context/CommentsContext";
import { ITask } from "../../entities/Task/ITask";
import store from "../../utils/store";
import { CommentForm } from "../CommentForm";
import { CommentList } from "../CommentList";
import "./index.css";

interface CardDetailsPopupProps {
  show: boolean;
  onHide: () => void;
  task: ITask;
}

const CardDetailsPopup: React.FC<CardDetailsPopupProps> = (props) => {
  const [columns] = useColumns();
  const [description, setDescription] = useState(props.task.description);

  const changeDescription = () => {
    store.changeTaskDescription(
      props.task.id,
      props.task.columnId,
      description
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header className="card-details__header" closeButton>
        <Modal.Title className="h6">author: {props.task.author}</Modal.Title>
        <Modal.Title className="h6">
          In column: {columns?.find((c) => props.task.columnId === c.id)?.name}
        </Modal.Title>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.task.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              placeholder="Enter your description"
              className="card-details__description"
              value={description}
              onChange={({ target: { value } }) => setDescription(value)}
              plaintext
              onBlur={changeDescription}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="card-details__comments-box">
        <CommentsProvider>
          <CommentList taskId={props.task.id} columnId={props.task.columnId} />
          <CommentForm taskId={props.task.id} columnId={props.task.columnId} />
        </CommentsProvider>
      </Modal.Footer>
    </Modal>
  );
};

export default CardDetailsPopup;
