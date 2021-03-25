import React, { useEffect, useState } from "react";
import "./board.css";
import { TaskList } from "../../entities/TaskList/ITaskList";
import store from "../../utils/store";
import { Column } from "../Column/Column";

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
  const [columns, setColumns] = useState<TaskList[]>([]);

  useEffect(() => {
    setColumns(store.getColumns());
  }, []);

  return (
    <div className="board">
      {columns.map((taskList) => (
        <Column taskList={taskList} />
      ))}
    </div>
  );
};
