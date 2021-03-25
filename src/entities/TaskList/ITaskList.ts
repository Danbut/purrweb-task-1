import { Task } from "../Task/ITask";

export interface TaskList {
  readonly id: string;
  name: string;
  readonly position: number;
  tasks: Task[];
}
