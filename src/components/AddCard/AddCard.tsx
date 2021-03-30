import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./index.css";
import { useAppDispatch } from "../../state/hooks";
import { addTask } from "../../state/task/taskSlice";

interface AddCardProps {
  columnId: string;
}

const AddCard: React.FC<AddCardProps> = ({ columnId }) => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const addTaskHandler = () => {
    dispatch(addTask({ name: text, columnId }));
    setIsActive(false);
    setText("");
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
          <Button variant="primary" onClick={addTaskHandler}>
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

export default AddCard;
