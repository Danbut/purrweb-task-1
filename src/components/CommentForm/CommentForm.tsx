import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./index.css";
import { useAppDispatch } from "../../state/hooks";
import { addComment } from "../../state/comments/commentsSlice";

interface CommentFormProps {
  readonly taskId: string;
  readonly columnId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ taskId, columnId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const addCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addComment({ comment, taskId, columnId }));

    setComment("");
  };

  return (
    <Form onSubmit={addCommentHandler}>
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
