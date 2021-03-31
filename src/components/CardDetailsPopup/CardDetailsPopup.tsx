import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { ITask } from "../../entities/Task/ITask";
import { selectColumns } from "../../state/columns/columnsSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { changeTaskDescription } from "../../state/task/taskSlice";
import { CommentForm } from "../CommentForm";
import { CommentList } from "../CommentList";
import "./index.css";

interface CardDetailsPopupProps {
  show: boolean;
  onHide: () => void;
  task: ITask;
}

const CardDetailsPopup: React.FC<CardDetailsPopupProps> = (props) => {
  const columns = useAppSelector(selectColumns);
  const [description, setDescription] = useState(props.task.description);
  const dispatch = useAppDispatch();

  const changeDescription = () => {
    dispatch(
      changeTaskDescription({
        taskId: props.task.id,
        columnId: props.task.columnId,
        description,
      })
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
        <CommentList taskId={props.task.id} columnId={props.task.columnId} />
        <CommentForm taskId={props.task.id} columnId={props.task.columnId} />
      </Modal.Footer>
    </Modal>
  );
};

export default CardDetailsPopup;
