import { ITask } from "../Task/ITask";

export interface IColumn {
  readonly id: string;
  name: string;
  tasks: ITask[];
}
