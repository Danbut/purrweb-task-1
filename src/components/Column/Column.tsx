import React, { useState } from "react";
import { IColumn } from "../../entities/Column/IColumn";
import { Form } from "react-bootstrap";
import store from "../../utils/store";
import "./index.css";
import { AddCard } from "../AddCard";
import { Card } from "../Card";
import { CommentsCountProvider } from "../../context/CommentsCount";

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
      </Form.Group>
      {column.tasks.map((t) => (
        <CommentsCountProvider>
          <Card task={t} key={`id:${t.id}`} />
        </CommentsCountProvider>
      ))}
      <AddCard columnId={column.id} />
    </Form>
  );
};

export default Column;
