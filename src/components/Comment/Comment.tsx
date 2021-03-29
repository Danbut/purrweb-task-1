import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card as BootstrapCard,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useComments } from "../../context/CommentsContext";
import { IComment } from "../../entities/Comment/IComment";
import store from "../../utils/store";
import "./index.css";

interface CommentProps {
  comment: IComment;
  taskId: string;
  columnId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, taskId, columnId }) => {
  const [isChangingComment, setIsChangingComment] = useState(false);
  const [, setComments] = useComments();
  const [commentText, setCommentText] = useState(comment.text);
  const [isShowActionsPopover, setIsShowActionsPopover] = useState(false);
  const controlRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    window.addEventListener("click", onClosePopover);
    return () => window.removeEventListener("click", onClosePopover);
  }, []);

  const onClosePopover = () => {
    setIsShowActionsPopover(false);
  };

  useEffect(() => {
    if (isChangingComment) {
      controlRef.current?.focus();
    }
  }, [isChangingComment]);

  const updateComments = () => {
    const comments = store.getComments(taskId, columnId);
    if (comments && setComments) {
      setComments(comments);
    }
  };

  const removeComment = () => {
    store.removeComment(taskId, columnId, comment.id);
    updateComments();
    handleClickPopover();
  };

  const changeComment = () => {
    store.changeComment(taskId, columnId, comment.id, commentText);
    updateComments();
    setIsChangingComment(false);
  };

  const handleClickPopover = () => {
    setIsShowActionsPopover(!isShowActionsPopover);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Comment Actions</Popover.Title>
      <Popover.Content className="popover__actions">
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClickPopover();
            setIsChangingComment(true);
          }}
        >
          Change comment
        </Button>
        <Button variant="danger" onClick={removeComment}>
          Remove comment
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <BootstrapCard className="card" bg="light" as={"p"}>
      <BootstrapCard.Title className="card__title h6">
        {comment.author}
      </BootstrapCard.Title>
      <div className="card__comment">
        {isChangingComment ? (
          <Form>
            <Form.Group controlId="formBasicColumnName">
              <InputGroup hasValidation>
                <Form.Control
                  required
                  as="textarea"
                  rows={2}
                  plaintext
                  type="text"
                  className="card__textarea"
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  onClick={(
                    e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>
                  ) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onBlur={changeComment}
                  ref={controlRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        ) : (
          <BootstrapCard.Body>{commentText}</BootstrapCard.Body>
        )}
        <OverlayTrigger
          show={isShowActionsPopover}
          placement="right"
          overlay={popover}
        >
          <button
            className="card__more"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleClickPopover();
            }}
          >
            ...
          </button>
        </OverlayTrigger>
      </div>
    </BootstrapCard>
  );
};

export default Comment;
