import React, { useState } from "react";
import { TaskList } from "../../entities/TaskList/ITaskList";
import { Form } from "react-bootstrap";
import store from "../../utils/store";
import "./Column.css";
import { AddCard } from "../AddCard/AddCard";

interface ColumnProps {
  taskList: TaskList;
}

export const Column: React.FC<ColumnProps> = ({ taskList }) => {
  const [columnName, setColumnName] = useState<string>(taskList.name);

  const renameColumn = () => {
    store.renameColumn(taskList.id, columnName);
  };

  return (
    <Form className="column">
      <Form.Group className="column__header" controlId="formBasicColumnName">
        <Form.Control
          as="textarea"
          rows={1}
          className="column__column-name"
          plaintext
          type="text"
          value={columnName}
          onChange={({ target: { value } }) => setColumnName(value)}
          onBlur={renameColumn}
        />
        <a className="column__more">...</a>
      </Form.Group>

      <AddCard columnId={taskList.id} />
    </Form>
  );
};
