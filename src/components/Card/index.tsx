import React, { useEffect, useState } from "react";
import { ITask } from "../../entities/Task/ITask";
import {
  Button,
  Card as BootstrapCard,
  OverlayTrigger,
  Popover,
  Form,
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

  useEffect(() => {
    const countComments = store.getComments(task.id, task.columnId);
    setCountComments(countComments?.length);
  }, []);

  const handleClose = () => {
    setIsShowCardDetails(false);
  };

  const removeTask = () => {
    store.removeTask(task.id, task.columnId);
    if (setColumns) {
      setColumns(store.getColumns());
    }
  };

  const renameTask = () => {
    store.renameTask(task.id, task.columnId, taskName);
    if (setColumns) {
      setColumns(store.getColumns());
    }
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
          <Form>
            <Form.Group controlId="formBasicColumnName">
              <Form.Control
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
                className="card__renaming-task"
                onBlur={renameTask}
              />
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
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <button
              className="card__more"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
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
