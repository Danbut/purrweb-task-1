import React from "react";
import { ITask } from "../../entities/Task/ITask";

interface CardProps {
  task: ITask;
}

const Card: React.FC<CardProps> = ({ task }) => {
  return <div>{task.name}</div>;
};

export default Card;
