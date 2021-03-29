import React from "react";
import "./index.css";
import { Column } from "../Column";
import { useColumns } from "../../context/ColumnsContext";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const [columns] = useColumns();

  return (
    <div className="board">
      {columns?.map((c) => (
        <Column column={c} key={`id:${c.id}`} />
      ))}
    </div>
  );
};

export default Board;
