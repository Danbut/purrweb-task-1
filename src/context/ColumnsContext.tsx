import React, { useEffect, useMemo, useState } from "react";
import {
  DONE_COLUMN_NAME,
  IN_PROGRESS_COLUMN_NAME,
  TESTING_COLUMN_NAME,
  TODO_COLUMN_NAME,
} from "../constants/exampleColumnNames";
import { IColumn } from "../entities/Column/IColumn";
import store from "../utils/store";

const ColumnsContext = React.createContext<
  [IColumn[], React.Dispatch<React.SetStateAction<IColumn[]>>] | []
>([]);

export const useColumns = () => {
  const context = React.useContext(ColumnsContext);
  if (context === undefined) {
    throw new Error("useColumns must be used within a ColumnsProvider");
  }
  return context;
};

export const ColumnsProvider = (props: any) => {
  const [columns, setColumns] = useState<IColumn[]>([]);

  useEffect(() => {
    const columns = store.getColumns();

    if (columns.length === 0) {
      store.addColumns([
        TODO_COLUMN_NAME,
        IN_PROGRESS_COLUMN_NAME,
        TESTING_COLUMN_NAME,
        DONE_COLUMN_NAME,
      ]);
    }

    setColumns(store.getColumns());
  }, []);

  const value = useMemo(() => [columns, setColumns], [columns]);
  return <ColumnsContext.Provider value={value} {...props} />;
};
