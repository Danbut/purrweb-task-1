import React, { useState } from "react";
import { IColumn } from "../../entities/Column/IColumn";
import { Form } from "react-bootstrap";
import "./index.css";
import { AddCard } from "../AddCard";
import { Card } from "../Card";
import { useAppDispatch } from "../../state/hooks";
import { renameColumn } from "../../state/column/columnSlice";

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [columnName, setColumnName] = useState(column.name);
  const dispatch = useAppDispatch();

  return (
    <div className="column">
      <Form>
        <Form.Group className="column__header" controlId="formBasicColumnName">
          <Form.Control
            as="textarea"
            rows={1}
            className="column__column-name"
            plaintext
            type="text"
            value={columnName}
            onChange={({ target: { value } }) => setColumnName(value)}
            onBlur={() => {
              dispatch(renameColumn({ id: column.id, name: columnName }));
            }}
          />
        </Form.Group>
      </Form>
      {column.tasks.map((t) => (
        <Card task={t} key={`id:${t.id}`} />
      ))}
      <AddCard columnId={column.id} />
    </div>
  );
};

export default Column;
