import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./AddCard.css";
import store from "../../utils/store";

interface AddCardProps {
  columnId: string;
}

export const AddCard: React.FC<AddCardProps> = ({ columnId }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const addTask = () => {
    store.addTask(text, columnId);
  };

  if (isActive) {
    return (
      <div className="add-task-form">
        <div className="add-task-form__header">
          <textarea
            rows={2}
            className="add-task-form__task-name"
            placeholder={"Please, enter card name"}
            onChange={({ target: { value } }) => setText(value)}
          />
        </div>
        <div className="add-task-form__footer">
          <Button variant="primary" onClick={addTask}>
            Save
          </Button>
          <a
            className="add-task-form__close"
            onClick={() => {
              setIsActive(false);
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <Button variant="primary" block onClick={() => setIsActive(true)}>
        Add Card
      </Button>
    );
  }
};
