import React, { useEffect, useRef, useState } from "react";
import { ITask } from "../../entities/Task/ITask";
import {
  Button,
  Card as BootstrapCard,
  OverlayTrigger,
  Popover,
  Form,
  InputGroup,
} from "react-bootstrap";
import "./index.css";
import { CardDetailsPopup } from "../CardDetailsPopup";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { removeTask, renameTask } from "../../state/task/taskSlice";
import { selectComments } from "../../state/comments/commentsSlice";

interface CardProps {
  task: ITask;
}

const Card: React.FC<CardProps> = ({ task }) => {
  const [isShowCardDetails, setIsShowCardDetails] = useState(false);
  const commentsCount = useAppSelector(selectComments).get(task.id)
    ?.commentsCount;
  const [isRenamingTask, setIsRenamingTask] = useState(false);
  const dispatch = useAppDispatch();
  const [taskName, setTaskName] = useState(task.name);
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
    if (isRenamingTask) {
      controlRef.current?.focus();
    }
  }, [isRenamingTask]);

  const handleClose = () => {
    setIsShowCardDetails(false);
  };

  const removeTaskHandler = () => {
    dispatch(removeTask({ taskId: task.id, columnId: task.columnId }));
    handleClickPopover();
  };

  const renameTaskHandler = () => {
    dispatch(
      renameTask({ taskId: task.id, columnId: task.columnId, name: taskName })
    );
    setIsRenamingTask(false);
  };

  const handleClickPopover = () => {
    setIsShowActionsPopover(!isShowActionsPopover);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Task Actions</Popover.Title>
      <Popover.Content className="popover__actions">
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleClickPopover();
            setIsRenamingTask(true);
          }}
        >
          Rename task
        </Button>
        <Button variant="danger" onClick={removeTaskHandler}>
          Remove task
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <BootstrapCard
        className="card"
        bg="light"
        onClick={() => setIsShowCardDetails(true)}
      >
        {isRenamingTask ? (
          <Form className="card__form">
            <Form.Group controlId="formBasicColumnName">
              <InputGroup hasValidation>
                <Form.Control
                  required
                  as="textarea"
                  rows={1}
                  plaintext
                  type="text"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                  onClick={(
                    e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>
                  ) => {
                    e.stopPropagation();
                  }}
                  className="card__renaming-task h6"
                  onBlur={renameTaskHandler}
                  ref={controlRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        ) : (
          <BootstrapCard.Title className="h6">{task.name}</BootstrapCard.Title>
        )}
        <BootstrapCard.Body className="card__body">
          {commentsCount && commentsCount > 0 ? (
            <span>
              <img src="https://img.icons8.com/small/16/000000/message-group.png" />
              {` ${commentsCount}`}
            </span>
          ) : null}
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
        </BootstrapCard.Body>
      </BootstrapCard>
      <CardDetailsPopup
        show={isShowCardDetails}
        onHide={handleClose}
        task={task}
      />
    </>
  );
};

export default Card;
