import React, { useState } from "react";
import { ITask } from "../../entities/Task/ITask";
import { Card as BootstrapCard } from "react-bootstrap";
import "./index.css";
import CardDetailsPopup from "../CardDetailsPopup";

interface CardProps {
  task: ITask;
}

const Card: React.FC<CardProps> = ({ task }) => {
  const [isShowCardDetails, setIsShowCardDetails] = useState(false);

  const handleClose = () => {
    setIsShowCardDetails(false);
  };

  return (
    <>
      <BootstrapCard
        className="card"
        bg="light"
        as={"a"}
        onClick={() => setIsShowCardDetails(true)}
      >
        <BootstrapCard.Title className="card__title h6">
          {task.name}
        </BootstrapCard.Title>
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
