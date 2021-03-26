import React, { useState } from "react";
import store from "../../utils/store";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useComments } from "../../context/CommentsContext";

interface CommentFormProps {
  readonly taskId: string;
  readonly columnId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ taskId, columnId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [, setComments] = useComments();

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.addComment(comment, name, taskId, columnId);
    const comments = store.getComments(taskId, columnId);
    if (comments && setComments) {
      setComments(comments);
    }
  };

  return (
    <Form onSubmit={addComment}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Your name</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Label>Say something</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type="text"
            value={comment}
            onChange={({ target: { value } }) => setComment(value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your comment.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default CommentForm;
