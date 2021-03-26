import { ITask } from "../Task/ITask";

export interface IColumn {
  readonly id: string;
  name: string;
  readonly position: number;
  tasks: ITask[];
}
