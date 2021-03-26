import { uuidv4 } from "../../utils/uuidv4";
import { IColumn } from "./IColumn";
import { ITask } from "../Task/ITask";

export class ColumnImpl implements IColumn {
  id: string;
  name: string;
  position: number;
  tasks: ITask[];

  constructor(name: string, position: number) {
    this.id = uuidv4();
    this.name = name;
    this.position = position;
    this.tasks = [];
  }
}
