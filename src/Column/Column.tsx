import React, { useState } from 'react';
import { TaskList } from '../entities/TaskList/ITaskList';
import { Button, Form } from 'react-bootstrap';
import store from '../utils/store'
import "./column.css"

interface ColumnProps {
  taskList: TaskList
}

export const Column: React.FC<ColumnProps> = ({taskList}) => {
  const [columnName, setColumnName] = useState<string>(taskList.name)

  const renameColumn = () => {
    store.renameColumn(taskList.id, columnName)
  }

  return (
      <Form className="column" onSubmit={renameColumn}>
        <Form.Group controlId="formBasicColumnName">
          <Form.Control plaintext type="text" value={columnName} onChange={
            ({ target: { value } }) => setColumnName(value)
          } onBlur={renameColumn} />
        </Form.Group>

        <Button variant="primary" block>
          Add task
        </Button>
      </Form>
  )
}
