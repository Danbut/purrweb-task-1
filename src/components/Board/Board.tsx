import React from "react";
import "./index.css";
import { Column } from "../Column";
import { useAppSelector } from "../../state/hooks";
import { selectColumns } from "../../state/columns/columnsSlice";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const columns = useAppSelector(selectColumns);

  return (
    <div className="board">
      {columns?.map((c) => (
        <Column column={c} key={`id:${c.id}`} />
      ))}
    </div>
  );
};

export default Board;
