import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card as BootstrapCard,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { IComment } from "../../entities/Comment/IComment";
import {
  changeComment,
  removeComment,
} from "../../state/comments/commentsSlice";
import { useAppDispatch } from "../../state/hooks";
import "./index.css";

interface CommentProps {
  comment: IComment;
  taskId: string;
  columnId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, taskId, columnId }) => {
  const [isChangingComment, setIsChangingComment] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const [isShowActionsPopover, setIsShowActionsPopover] = useState(false);
  const controlRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

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

  const removeCommentHandler = () => {
    dispatch(removeComment({ taskId, columnId, commentId: comment.id }));

    handleClickPopover();
  };

  const changeCommentHandler = () => {
    dispatch(
      changeComment({
        taskId,
        columnId,
        commentId: comment.id,
        text: commentText,
      })
    );

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
            handleClickPopover();
            setIsChangingComment(true);
          }}
        >
          Change comment
        </Button>
        <Button variant="danger" onClick={removeCommentHandler}>
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
                  }}
                  onBlur={changeCommentHandler}
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
