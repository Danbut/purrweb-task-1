import { ITask } from "../Task/ITask";

export interface ITaskList {
  readonly id: string;
  name: string;
  readonly position: number;
  tasks: ITask[];
}
