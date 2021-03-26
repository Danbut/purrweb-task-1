import { ColumnImpl } from "../entities/Column/ColumnImpl";
import { IColumn } from "../entities/Column/IColumn";
import { CommentImpl } from "../entities/Comment/CommentImpl";
import { TaskImpl } from "../entities/Task/TaskImpl";

class StoreService {
  private authorNameKey = "author";
  private columnKey = "columns";
  private commentsKey = "comments";
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

    names.forEach((name) => {
      columns.push(new ColumnImpl(name));
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
    const taskList = new ColumnImpl(name);

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
    const author = this.getName()!!;
    if (column) {
      const task = new TaskImpl(name, columnId, author);
      column.tasks.push(task);
    }

    this.setColumns(columns);
  };

  removeTask = (taskId: string, columnId: string): void => {
    const columns = this.getColumns();
    const column = columns.find((c) => columnId === c.id);
    if (column) {
      column.tasks = column.tasks.filter((t) => taskId !== t.id);
    }

    this.setColumns(columns);
  };

  changeTaskDescription = (
    taskId: string,
    columnId: string,
    description: string
  ): void => {
    const columns = this.getColumns();
    const column = columns.find((c) => columnId === c.id);
    if (column) {
      const task = column.tasks.find((t) => taskId === t.id);
      if (task) {
        task.description = description;
      }
    }

    this.setColumns(columns);
  };

  renameTask = (taskId: string, columnId: string, name: string): void => {
    const columns = this.getColumns();
    const column = columns.find((c) => columnId === c.id);
    if (column) {
      const task = column.tasks.find((t) => taskId === t.id);
      if (task) {
        task.name = name;
      }
    }

    this.setColumns(columns);
  };

  // Comment Store

  addComment = (
    comment: string,
    author: string,
    taskId: string,
    columnId: string
  ) => {
    const columns = this.getColumns();
    const column = columns.find((c) => columnId === c.id);
    const task = column?.tasks.find((t) => taskId === t.id);
    task?.comments.push(new CommentImpl(comment, author));

    this.setColumns(columns);
  };

  getComments = (taskId: string, columnId: string) => {
    const column = this.getColumns().find((c) => columnId === c.id);
    const task = column?.tasks.find((t) => taskId === t.id);
    return task?.comments;
  };
}

export default new StoreService();
