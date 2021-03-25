import { uuidv4 } from "../../utils/uuidv4";
import { TaskList } from "./ITaskList";
import { Task } from "../Task/ITask";

export class TaskListImpl implements TaskList {
  id: string;
  name: string;
  position: number;
  tasks: Task[];

  constructor(name: string, position: number) {
    this.id = uuidv4();
    this.name = name;
    this.position = position;
    this.tasks = [];
  }
}
