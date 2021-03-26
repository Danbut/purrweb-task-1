import React, { useState } from "react";
import { ITaskList } from "../../entities/TaskList/ITaskList";
import { Form } from "react-bootstrap";
import store from "../../utils/store";
import "./index.css";
import AddCard from "../AddCard";

interface ColumnProps {
  taskList: ITaskList;
}

const Column: React.FC<ColumnProps> = ({ taskList }) => {
  const [columnName, setColumnName] = useState(taskList.name);

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

export default Column;
