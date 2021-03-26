import React from "react";
import { ITask } from "../../entities/Task/ITask";
import { Card as BootstrapCard } from "react-bootstrap";
import "./index.css";

interface CardProps {
  task: ITask;
}

const Card: React.FC<CardProps> = ({ task }) => {
  return (
    <BootstrapCard className="card" bg="light">
      <BootstrapCard.Title className="card__title h6">
        {task.name}
      </BootstrapCard.Title>
    </BootstrapCard>
  );
};

export default Card;
