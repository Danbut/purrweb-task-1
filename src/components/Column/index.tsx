import React, { useState } from "react";
import { IColumn } from "../../entities/Column/IColumn";
import { Form } from "react-bootstrap";
import store from "../../utils/store";
import "./index.css";
import AddCard from "../AddCard";
import Card from "../Card";

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [columnName, setColumnName] = useState(column.name);

  const renameColumn = () => {
    store.renameColumn(column.id, columnName);
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
        <a className="column__more" href="">
          ...
        </a>
      </Form.Group>
      {column.tasks.map((t) => (
        <Card task={t} key={`id:${t.id}`} />
      ))}
      <AddCard columnId={column.id} />
    </Form>
  );
};

export default Column;
