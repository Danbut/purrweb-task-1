import React, { useEffect, useState } from "react";
import "./Board.css";
import { Column } from "../Column/Column";
import { TaskList } from "../../entities/TaskList/ITaskList";
import store from "../../utils/store";

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
  const [columns, setColumns] = useState<TaskList[]>([]);

  useEffect(() => {
    setColumns(store.getColumns);
  }, []);

  return (
    <div className="board">
      {columns.map((taskList) => (
        <Column taskList={taskList} />
      ))}
    </div>
  );
};
