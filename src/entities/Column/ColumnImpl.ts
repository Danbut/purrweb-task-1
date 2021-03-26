import { uuidv4 } from "../../utils/uuidv4";
import { IColumn } from "./IColumn";
import { ITask } from "../Task/ITask";

export class ColumnImpl implements IColumn {
  id: string;
  name: string;
  tasks: ITask[];

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.tasks = [];
  }
}
