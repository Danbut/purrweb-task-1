import { uuidv4 } from "../../utils/uuidv4";
import { ITaskList } from "./ITaskList";
import { ITask } from "../Task/ITask";

export class TaskListImpl implements ITaskList {
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
