import { IComment } from "../Comment/IComment";

export interface ITask {
  readonly id: string;
  readonly name: string;
  description: string;
  readonly columnId: string;
  readonly author: string;
  comments: IComment[];
}
