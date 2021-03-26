import React, { useEffect, useState } from "react";
import { ITask } from "../../entities/Task/ITask";
import {
  Button,
  Card as BootstrapCard,
  OverlayTrigger,
  Popover,
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
  const [, setColumns] = useColumns();

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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Task Actions</Popover.Title>
      <Popover.Content>
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
        <BootstrapCard.Title className="h6">{task.name}</BootstrapCard.Title>
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
