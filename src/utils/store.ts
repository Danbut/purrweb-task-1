import { ColumnImpl } from "../entities/Column/ColumnImpl";
import { IColumn } from "../entities/Column/IColumn";
import { TaskImpl } from "../entities/Task/TaskImpl";

class StoreService {
  private authorNameKey = "author";
  private columnKey = "columns";
  private storage = window.localStorage;

  // Name store

  setName = (name: string): void => {
    this.storage.setItem(this.authorNameKey, name);
  };

  getName = (): string | null => {
    return this.storage.getItem(this.authorNameKey);
  };

  removeName = (): void => {
    this.storage.removeItem(this.authorNameKey);
  };

  // Columns store

  addColumns = (names: string[]): void => {
    const columns = this.getColumns();
    const position = columns.length ?? 0;

    names.forEach((name, index) => {
      columns.push(new ColumnImpl(name, position + index));
    });

    this.setColumns(columns);
  };

  getColumns = (): IColumn[] => {
    const value = this.storage.getItem(this.columnKey);
    if (value) {
      const columns = JSON.parse(value);
      return columns;
    }

    return [];
  };

  setColumns = (arr: IColumn[]): void => {
    this.storage.setItem(this.columnKey, JSON.stringify(arr));
  };

  removeColumns = (): void => {
    this.storage.removeItem(this.columnKey);
  };

  // Column store

  addColumn = (name: string): void => {
    const columns = this.getColumns();
    const position = columns.length ?? 0;
    const taskList = new ColumnImpl(name, position);

    columns.push(taskList);
    this.setColumns(columns);
  };

  renameColumn = (id: string, name: string): void => {
    const columns = this.getColumns().map((c) => {
      if (c.id === id) {
        c.name = name;
      }
      return c;
    });

    this.setColumns(columns);
  };

  // Task store

  addTask = (name: string, columnId: string): void => {
    const columns = this.getColumns();
    const column = columns.find((c) => columnId === c.id);
    if (column) {
      const task = new TaskImpl(name, column.tasks.length, columnId);
      column.tasks.push(task);
    }

    this.setColumns(columns);
  };
}

export default new StoreService();
