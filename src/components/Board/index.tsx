import React, { useEffect, useState } from "react";
import "./index.css";
import Column from "../Column";
import { ITaskList } from "../../entities/TaskList/ITaskList";
import store from "../../utils/store";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const [columns, setColumns] = useState<ITaskList[]>([]);

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

export default Board;
