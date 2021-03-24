import React, { useEffect, useState } from 'react';
import { TaskList } from '../entities/TaskList/ITaskList';
import { Button, Form } from 'react-bootstrap';
import useDebounce from '../customHooks/useDebounce';
import store from '../utils/store'
import "./column.css"

interface ColumnProps {
  taskList: TaskList
}

export const Column: React.FC<ColumnProps> = ({taskList}) => {
  const [columnName, setColumnName] = useState<string>(taskList.name)
  const debouncedColumnName = useDebounce(columnName, 500);

  useEffect(() => {
    if (debouncedColumnName) {
        store.renameColumn(taskList.id, debouncedColumnName);
    }
  }, [debouncedColumnName, taskList.id]);


  return (
      <Form className="column">
        <Form.Group controlId="formBasicColumnName">
          <Form.Control plaintext type="text" value={columnName} onChange={
            ({ target: { value } }) => setColumnName(value)
          } />
        </Form.Group>

        <Button variant="primary" block>
          Add task
        </Button>
      </Form>
  )
}
