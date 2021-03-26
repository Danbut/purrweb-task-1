import { uuidv4 } from "../../utils/uuidv4";
import { TaskList } from "./ITaskList";

export class TaskListImpl implements TaskList {
  id: string;
  name: string;
  position: number;

  constructor(name: string, position: number) {
    this.id = uuidv4();
    this.name = name;
    this.position = position;
  }
}
