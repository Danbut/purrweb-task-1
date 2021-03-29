import React, { useState } from "react";
import store from "../../utils/store";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useComments } from "../../context/CommentsContext";
import "./index.css";

interface CommentFormProps {
  readonly taskId: string;
  readonly columnId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ taskId, columnId }) => {
  const [comment, setComment] = useState("");
  const [, setComments] = useComments();

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.addComment(comment, taskId, columnId);
    const comments = store.getComments(taskId, columnId);
    if (comments && setComments) {
      setComments(comments);
    }
  };

  return (
    <Form onSubmit={addComment}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Say something</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            as="textarea"
            rows={3}
            type="text"
            value={comment}
            onChange={({ target: { value } }) => setComment(value)}
            className="comment-form__textarea"
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
