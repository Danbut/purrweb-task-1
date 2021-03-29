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
import CardDetailsPopup from "../CardDetailsPopup";
import store from "../../utils/store";
import { useColumns } from "../../context/ColumnsContext";

interface CardProps {
  task: ITask;
}

const Card: React.FC<CardProps> = ({ task }) => {
  const [isShowCardDetails, setIsShowCardDetails] = useState(false);
  const [countComments, setCountComments] = useState<number | undefined>();
  const [isRenamingTask, setIsRenamingTask] = useState(false);
  const [, setColumns] = useColumns();
  const [taskName, setTaskName] = useState(task.name);
  const [isShowActionsPopover, setIsShowActionsPopover] = useState(false);
  const controlRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const countComments = store.getComments(task.id, task.columnId);
    setCountComments(countComments?.length);
  }, []);

  useEffect(() => {
    if (isRenamingTask) {
      controlRef.current?.focus();
    }
  }, [isRenamingTask]);

  const handleClose = () => {
    setIsShowCardDetails(false);
  };

  const removeTask = () => {
    store.removeTask(task.id, task.columnId);
    if (setColumns) {
      setColumns(store.getColumns());
    }
    handleClickPopover();
  };

  const renameTask = () => {
    store.renameTask(task.id, task.columnId, taskName);
    if (setColumns) {
      setColumns(store.getColumns());
    }
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
            e.preventDefault();
            handleClickPopover();
            setIsRenamingTask(true);
          }}
        >
          Rename task
        </Button>
        <Button variant="danger" onClick={removeTask}>
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
                    e.preventDefault();
                  }}
                  className="card__renaming-task h6"
                  onBlur={renameTask}
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
          {countComments && countComments > 0 ? (
            <span>
              <img src="https://img.icons8.com/small/16/000000/message-group.png" />
              {` ${countComments}`}
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
                e.preventDefault();
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
